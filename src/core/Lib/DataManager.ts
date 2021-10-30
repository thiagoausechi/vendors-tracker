import { ACCEPTABLE_LOCALES } from "../../lang/Language";
import { getValue, updateFields } from "../Backend/Database";
import http from "../Lib/HttpUtils";
import { fetchVendorsFromList, isXurActive } from "./CacheManager";

import ArmorStatus from "../ArmorStatus";
import Guardian from "../Guardian";
import { HASH_XUR, WEEKLY_VENDORS } from "./HashLexicon";

/**
 * Get Vendors data from cache.
 * If there's no cached data, then fetch new data.
 * 
 * @returns { "locale": [ VendorsProps ] }
 */
export async function getVendors(): Promise<object>
{
    let cachedData;

    try 
    {
        console.log("Getting vendors data from cache.")
        const cache = await getValue("vendors", "data", "cache");
        cachedData = JSON.parse(cache);
    }
    catch (e)
    {
        console.error("Vendors cache not initialized.");
    }

    if (!cachedData || Object.keys(cachedData).length === 0)
    {
        let data;
        if (await isXurActive())
            data = await fetchVendorsFromList([HASH_XUR, ...WEEKLY_VENDORS]);
        else
            data = await fetchVendorsFromList(WEEKLY_VENDORS);

        try
        {
            await updateFields("vendors", "data",
                { cache: JSON.stringify(data) });
        }
        catch (e)
        {
            console.log("Error writing Vendos Cache!")
            console.log(e);
        }

        cachedData = data;
    }

    return cachedData;
}

export async function requestRebuild()
{
    console.log("\n> Making a rebuild request.");

    try
    {
        console.log("Clearing all cached info.");
        await updateFields("vendors", "data", { cache: "" });

        console.log("Sending HTTP Request.");
        http.request(
            {
                url: process.env.NEXT_PUBLIC_VERCEL_REBUILD,
                method: "GET",
                useApiKey: false
            }
        );
    }
    catch (e)
    {
        console.error("Could not execute rebuild request.");
        console.error(e);
    }

}

/**
 * Get Bungie User information.
 * 
 * @param name Username with #code
 * @param index For Crosssave accounts
 * @returns Promise<UserProps>
 */
export async function getUser(name: string, index = 0): Promise<UserProps>
{
    let user: UserProps;
    try
    {
        const user_request = (await http.request(
            {
                url: `https://www.bungie.net/platform/Destiny2/SearchDestinyPlayer/-1/${name}/?components=204`,
                method: "GET",
                useApiKey: true
            })).Response;

        const u = user_request[index];
        const chars_request: string[] = (await http.request(
            {
                url: `https://www.bungie.net/Platform/Destiny2/${u.membershipType}/Profile/${u.membershipId}/?components=200`,
                method: "GET",
                useApiKey: true
            })).Response.characters.data;

        let chars;
        if (chars_request)
        {
            chars = {};
            Object.keys(chars_request).map(k =>
            {
                chars[+chars_request[k]["classType"]] = chars_request[k]["characterId"];
            });
        }

        user =
        {
            name: u.bungieGlobalDisplayName,
            code: u.bungieGlobalDisplayNameCode,
            membershipType: u.membershipType,
            membershipId: u.membershipId,
            characters: chars
        }
    }
    catch (e)
    {
        console.error("Could not load user");
        console.error(e);
    }

    return user;
}

export type UserProps = {
    name: string,
    code: number,
    membershipType: number,
    membershipId: string,
    characters?: { [key: number]: string }
};

export async function getTranslatedKeys()
{
    const manifest = await http.requestManifest();

    try
    {
        for (const locale_index in ACCEPTABLE_LOCALES)
        {
            const locale = ACCEPTABLE_LOCALES[locale_index]
            const definitions = await Promise.all([
                http._requestManifestEntity(manifest, locale, "DestinyStatDefinition"),
                http._requestManifestEntity(manifest, locale, "DestinyClassDefinition")
            ]);
            const stat_def = definitions[0];
            const class_def = definitions[1];

            // translate["hello"] = "Olá";
            console.log(`================================================================================================= ${locale}.ts`);
            console.log("\n");
            console.log("// ARMOR STATS");
            ArmorStatus.LIST.map(s =>
            {
                console.log(`translate["${s.hash}_name"] = "${stat_def[s.hash]["displayProperties"]["name"]}"`);
                console.log(`translate["${s.hash}_description"] = "${stat_def[s.hash]["displayProperties"]["description"]}"`);
            });

            console.log("\n");
            console.log("// GUARDIANS");
            Guardian.LIST.map(g =>
            {
                console.log(`translate["${g.hash}_name"] = "${class_def[g.hash]["displayProperties"]["name"]}"`);
            });
        }
    }
    catch (e)
    {
        console.error(e);
    }
}
