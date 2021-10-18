import Vendor from "./Vendor";
import VendorsList from "./Cached/VendorsList.json"
import CachedManifest from "./Cached/Manifest.json"

export default class DataManager
{
    #vendors: Vendor[] = [];

    constructor()
    {
        console.log("Starting DataManager");

        VendorsList.map((v) => { this.#vendors.push(new Vendor(v.hash).setColor(v.color)) });

        // TODO If Xûr is not present, remove it from the array 

        this.#start();
    }

    async #start()
    {
        const fakeHttp = async (config) => console.log(config.url);

        //console.log(manifestMetadata.version);
        console.log(CachedManifest.version);
        //console.log(manifestMetadata.version === CachedManifest.version);
    }

    getVendors(): Vendor[]
    {
        return this.#vendors;
    }
}