import Guardian from "./Guardian";
import VendorSales from "./VendorSales";

export default class Vendor
{
    #properties = new Map<string, string>();
    #sales = new Map<Guardian, VendorSales>();
    #locale?: string;

    constructor(hash: string, locale?: string)
    {
        this.#properties.set("hash", hash);
        if (locale)
        {
            this.#locale = locale;
            //setVendorName(hash, locale);
        }
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

    setIcons(icon: string, large_icon: string, map_icon: string)
    {
        this.#properties.set("icon", icon);
        this.#properties.set("large_icon", large_icon);
        this.#properties.set("map_icon", map_icon);
    }

    getIcon(key: 'icon' | 'large_icon' | 'map_icon'): string
    {
        return this.#properties.get(key);
    }

    setLocation(destination: string, bubble_id: number)
    {
        if (this.#locale)
        {
            //setVendorLocation(this.getHash(), destination, bubble_id, this.#locale);
        }
        else
            console.error(`Unable to set Location to #${this.getHash()} without a Locale`);
    }

    getLocation()
    {
        //return translateVendorsLocation(this.getHash(),):
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
            color: this.getColor(),
            icon: this.getIcon("icon"),
            large_icon: this.getIcon("large_icon"),
            map_icon: this.getIcon("map_icon"),
            location: this.getLocation()
        }
    }

    static fromSerialized(serialized: string): Vendor
    {
        const v = JSON.parse(serialized);
        return new Vendor(v.hash).setColor(v.color);
    }
}