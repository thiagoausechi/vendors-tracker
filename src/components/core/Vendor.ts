import Guardian from "./Guardian";
import VendorSales from "./VendorSales";

export default class Vendor
{
    #properties = new Map<string, string>();
    #sales = new Map<Guardian, VendorSales>();

    constructor(hash: string)
    {
        this.#properties.set("hash", hash);
    }

    get hash(): string
    {
        return this.#properties.get("hash");
    }

    set location(value: string)
    {
        this.#properties.set("location", value);
    }

    get location(): string
    {
        return this.#properties.get("location");
    }

    set color(value: string)
    {
        this.#properties.set("color", value);
    }

    get color(): string
    {
        return this.#properties.get("color");
    }

    addSale(guardian: Guardian, sale: VendorSales)
    {
        this.#sales.set(guardian, sale);
    }

    getSale(guardian: Guardian): VendorSales
    {
        return this.#sales.get(guardian);
    }
}