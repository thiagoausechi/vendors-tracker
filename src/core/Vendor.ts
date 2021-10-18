import Guardian from "./Guardian";
import JSONSerializable from "./JSONSerializable";
import VendorSales from "./VendorSales";

export default class Vendor extends JSONSerializable
{
    #properties = new Map<string, string>();
    #sales = new Map<Guardian, VendorSales>();

    constructor(hash: string)
    {
        super();
        this.#properties.set("hash", hash);
    }

    getHash(): string
    {
        return this.#properties.get("hash");
    }

    setColor(value: string): Vendor
    {
        this.#properties.set("color", value);
        return this;
    }

    getColor(): string
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

    // SERIALIZATION
    protected toObject()
    {
        return {
            hash: this.getHash(),
            color: this.getColor()
        }
    }

    static fromSerialized(serialized: string): Vendor
    {
        const v = JSON.parse(serialized);
        return new Vendor(v.hash).setColor(v.color);
    }
}