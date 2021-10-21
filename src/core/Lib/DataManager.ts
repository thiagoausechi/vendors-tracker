import Vendor from "../Vendor";
import VendorsList from "../Cached/VendorsList.json"

export default class DataManager
{
    #vendors: Vendor[] = [];
    locale: string;

    constructor(locale: string)
    {
        console.log(`\n Starting DataManager ${locale}`);

        console.log(this.#vendors);

        VendorsList.map((v) => { this.#vendors.push(new Vendor(v.hash).setColor(v.color)) });
        VendorsList.map((v) => { this.#vendors.push(new Vendor(v.hash).setColor(v.color)) });
        this.locale = locale;
        // TODO If Xûr is not present, remove it from the array 

        this.#start();
    }

    async #start()
    {
        try
        {
            //const raw_vendors = await (await getDocs(query(collection(db, `vendors_raw`)))).docs;
            //const raw_meta = raw_vendors.find(d => d.id === "metadata").data();

            //console.log(raw_meta);
        } catch {}
        //console.log(`${collection_name} version ${db_version}`);

        //await setDoc(doc(db, collection_name, "metadata"), { version: "1" }).catch(e => console.log(e));
    }

    getVendors(): Vendor[]
    {
        return this.#vendors;
    }
}