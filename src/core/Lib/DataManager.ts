import fs from 'fs'
import path from 'path'
import Vendor from "../Vendor";
import ManifestManager from "../Lib/ManifestManager";
import { getCollection, getValue, getDocFromCollection } from "../Backend/Database";

const VENDORS_CACHE_PATH = path.resolve('public/cached/vendors.json')

export async function fetchVendorsData(msg: string)
{
    clearCache();
    return { hi: msg }
}

export async function clearCache()
{
    console.log("\n Cleaning all cache.")
    try
    {
        fs.writeFileSync(
            VENDORS_CACHE_PATH,
            "",
            'utf8');
        console.log("Successfully cleaned.")
    } catch (e)
    {
        console.log("Could not clean cache.")
        console.log(e);
    }
}

export async function getRawData()
{
    let cachedData = undefined;

    try 
    {
        console.log("Getting vendors data from cache.")

        cachedData = JSON.parse(
            fs.readFileSync(VENDORS_CACHE_PATH, 'utf8'));
    }
    catch (e)
    {
        console.error("Vendors cache not initialized.");
    }

    if (!cachedData)
    {
        const data = await fetchVendorsData("Created cache");
        try
        {
            fs.writeFileSync(
                VENDORS_CACHE_PATH,
                JSON.stringify(data),
                'utf8');
        }
        catch (e)
        {
            console.log("Error writing Vendos Cache to File!")
            console.log(e);
        }

        cachedData = data;
    }

    return cachedData;
}


export default class DataManager
{
    #vendors: Vendor[] = [];
    #locale: string;
    #manifest: ManifestManager;

    constructor(locale: string)
    {
        console.log(`\n Starting DataManager ${locale}`);
        this.#manifest = new ManifestManager();
        this.#locale = locale;

        this.#start();
    }

    async #start()
    {
        try
        {
            const vendors_raw = await JSON.parse(await getValue("vendors", "data", "raw"));
            vendors_raw.map((obj) =>
            {
                const vendor = new Vendor(obj.hash, this.#locale);
                vendor.setColor(obj.color);
                vendor.setIcons(obj.icon, obj.large_icon, obj.map_icon);
                vendor.setLocation(obj.location.destination, obj.location.bubble);

                this.#vendors.push(vendor);
            });

            console.log("\n Successfully started DataManager");
            console.log(`Total of ${this.getVendors().length} vendors registered.`);
        } catch (e)
        {
            console.error("\n Could not start DataManager.");
            console.error(e);
        }
    }

    getVendors(): Vendor[]
    {
        return this.#vendors;
    }
}