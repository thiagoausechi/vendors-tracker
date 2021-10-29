import { ACCEPTABLE_LOCALES } from "../../lang/Language";
import Vendor from "../Vendor";
import Guardian from "../Guardian";
import VendorSales from "../VendorSales";
import DestinyItemArmor, { VALID_ARMOR } from "../DestinyItemArmor";
import ArmorStatus from "../ArmorStatus";
import { logPerformance, now } from "../Hook/Performance";
import { getUser, getVendors, UserProps } from "./DataManager";
import { getValue } from "../Backend/Database";
import http from "../Lib/HttpUtils";
import XurVendor from "../XurVendor";
import { HASH_XUR } from "./HashLexicon";

export async function fetchVendorsFromList(hashes: string[])
{
    const fetch_perf_start = now(); // debug performance time

    let result = {}

    try
    {
        result = await fetchVendorsSales(hashes);
    }
    catch (e) { console.error(e); }

    // debug performance time
    const fetch_perf_end = now();
    console.log("\n");
    logPerformance(new Date(fetch_perf_end - fetch_perf_start), "Data fetch made");

    return result;
}

export async function fetchVendorsSales(hashes: string[])
{
    const result = {};

    try
    {
        const manifest = await http.requestManifest();
        const user: UserProps = await getUser(process.env.NEXT_PUBLIC_BUNGIE_USER, 0);
        const static_vendors = JSON.parse(await getValue("vendors", "data", "static"));
        const static_sales = await Promise.all([
            getStaticSales(user, Guardian.TITAN),
            getStaticSales(user, Guardian.HUNTER),
            getStaticSales(user, Guardian.WARLOCK)
        ]);

        for (const locale_index in ACCEPTABLE_LOCALES) // loop for all Locales
        {
            const locale_perf_start = now();
            const vendors = [];
            const locale = ACCEPTABLE_LOCALES[locale_index];
            const definitions = await Promise.all([
                http._requestManifestEntity(manifest, locale, "DestinyVendorDefinition"),
                http._requestManifestEntity(manifest, locale, "DestinyInventoryItemDefinition"),
                http._requestManifestEntity(manifest, locale, "DestinyDestinationDefinition")
            ]);

            console.log(`\n >>>>>>>>>> Fetching vendor for "${locale}" locale`);
            for (const static_index in hashes) // loop for static vendors
            {
                const vendor_perf_start = now();

                const vendor_hash = hashes[static_index];

                const vendor = await createVendor(
                    {
                        statics:
                        {
                            vendor: static_vendors[vendor_hash],
                            sales: static_sales
                        },
                        definitions: definitions
                    }
                );

                const vendor_perf_end = now();
                logPerformance(new Date(vendor_perf_end - vendor_perf_start), ` > ${vendor.getName()} (#${vendor.getHash()}) created`);

                console.log(vendor.toObject(locale));

                vendors.push(vendor.toObject(locale));
            }

            result[locale] = vendors;

            const locale_perf_end = now();
            logPerformance(new Date(locale_perf_end - locale_perf_start), ` > Ended fetch for "${locale}"`);
        }

        return result;
    }
    catch (e)
    {
        console.error("Could not fetch vendor data!!!");
        console.error(e);
    }

    return result;
}

export async function isXurActive(): Promise<XurLocationProps>
{
    const response = (await http.request(
        {
            url: "https://paracausal.science/xur/current.json",
            method: "GET",
            useApiKey: false
        }
    ));

    if (response)
    {
        const { location, destinationHash, bubbleIndex } = response;
        return {
            location_initials: location,
            destination: destinationHash,
            bubble: bubbleIndex
        };
    }
    else return undefined;
}

async function createVendor(params: VendorParams): Promise<Vendor>
{
    const { statics, definitions } = params;
    const { hash, destination, bubble, color, icon, large_icon, map_icon } = statics.vendor;

    const vendor_def = definitions[0][hash];
    const item_def = definitions[1];
    let destination_def = definitions[2][destination];

    let vendor: Vendor;
    if (hash == HASH_XUR) vendor = new XurVendor();
    else vendor = new Vendor(hash);

    vendor.setName(vendor_def.displayProperties.name);
    vendor.setColor(color);
    vendor.setIcons(icon, large_icon, map_icon);

    if (destination && bubble)
        vendor.setLocation
            (
                `${destination_def.bubbles[bubble]["displayProperties"]["name"]}, ${destination_def["displayProperties"]["name"]}`
            );
    else if (vendor instanceof XurVendor)
    {
        const { location_initials, destination, bubble } = await isXurActive();
        destination_def = definitions[2][destination];

        (vendor as XurVendor).setLocationInitials(location_initials);
        vendor.setLocation
            (
                `${destination_def.bubbles[bubble]["displayProperties"]["name"]}, ${destination_def["displayProperties"]["name"]}`
            );
    }

    Guardian.LIST.map(g => 
    {
        const sale = parseSales(statics.sales, item_def, hash, g);
        vendor.addSale(g, sale);
    });

    return vendor;
}

export async function getStaticSales(user: UserProps, guardian: Guardian): Promise<object>
{
    let result;

    try
    {
        const character = user.characters[+guardian.classType];
        const sales_request = (await http.requestWithAuth({
            url: `https://www.bungie.net/Platform/Destiny2/${user.membershipType}/Profile/${user.membershipId}/Character/${character}/Vendors/?components=402,304`,
            method: "GET",
            useApiKey: true
        })).Response;

        result = {
            sales: sales_request.sales.data,
            stats: sales_request.itemComponents
        }
    }
    catch (e)
    {
        console.error(`Could not get Static Sales.`);
        console.error(e);
    }

    return result;
}

export function parseSales(raw: object, item_def_raw: object, vendor: string, guardian: Guardian): VendorSales
{
    const result = new VendorSales();
    const saleItems = raw[guardian.classType]["sales"][vendor]["saleItems"];
    const saleStats = raw[guardian.classType]["stats"][vendor]["stats"]["data"];
    const salesKeys = Object.keys(saleItems);

    salesKeys.map(key => 
    {
        const item_hash = saleItems[key]["itemHash"];
        const item_def = item_def_raw[item_hash];

        if (VALID_ARMOR.some(id => item_def["itemSubType"] == id))
        {
            const armor = new DestinyItemArmor(item_hash, item_def["itemSubType"], guardian);
            const wm_versions = item_def["quality"]["displayVersionWatermarkIcons"];
            armor
                .setName(item_def["displayProperties"]["name"])
                .setIcon(item_def["displayProperties"]["icon"])
                .setWatermark(wm_versions[wm_versions.length - 1]);

            ArmorStatus.LIST.map(s => armor.setStatus(s, saleStats[key]["stats"][s.hash]["value"]));

            result.addItem(armor);
        }
    });

    return result;
}

type VendorParams = {
    statics:
    {
        vendor: any,
        sales: any
    },
    definitions: any[]
};

type XurLocationProps = {
    location_initials: string,
    destination: string,
    bubble: number
};
