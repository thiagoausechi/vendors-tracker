import { doc, setDoc, getDoc, collection, query, getDocs } from "firebase/firestore";
import db from "../core/Backend/Config";
import Vendor from "./Vendor";
import VendorsList from "./Cached/VendorsList.json"

export default class DataManager
{
    #vendors: Vendor[] = [];
    locale: string;

    constructor(locale: string)
    {
        console.log(`\n Starting DataManager ${locale}`);

        VendorsList.map((v) => { this.#vendors.push(new Vendor(v.hash).setColor(v.color)) });
        this.locale = locale;
        // TODO If Xûr is not present, remove it from the array 

        this.#start();
    }

    async #start()
    {
        const raw_vendors = await (await getDocs(query(collection(db, `vendors_raw`)))).docs;
        const raw_meta = raw_vendors.find(d => d.id === "metadata").data();

        console.log(raw_meta);

        //console.log(`${collection_name} version ${db_version}`);

        //await setDoc(doc(db, collection_name, "metadata"), { version: "1" }).catch(e => console.log(e));
    }

    getVendors(): Vendor[]
    {
        return this.#vendors;
    }
}