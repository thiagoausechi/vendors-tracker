import { useTranslation } from "../lang/Language";
import { DestinyItemProps } from "./DestinyItemArmor";
import Guardian from "./Guardian";
import VendorSales from "./VendorSales";

export default class Vendor
{
    #properties = new Map<string, string>();
    #sales = new Map<Guardian, VendorSales>();

    constructor(hash: string)
    {
        this.setProperty("hash", hash);
    }

    getHash(): string
    {
        return this.#properties.get("hash");
    }

    setName(value: string): Vendor
    {
        return this.setProperty("name", value);
    }

    getName(): string
    {
        return this.getProperty("name");
    }

    setColor(value: string): Vendor
    {
        return this.setProperty("color", value);;
    }

    getColor(): string
    {
        return this.getProperty("color");
    }

    setIcons(icon: string, large_icon: string, map_icon: string): Vendor
    {
        this.setProperty("icon", icon);
        this.setProperty("large_icon", large_icon);
        this.setProperty("map_icon", map_icon);
        return this;
    }

    getIcon(key: 'icon' | 'large_icon' | 'map_icon'): string
    {
        return this.getProperty(key);
    }

    setLocation(value: string): Vendor
    {
        return this.setProperty("location", value);
    }

    getLocation(): string
    {
        return this.getProperty("location");
    }

    addSale(guardian: Guardian, sale: VendorSales)
    {
        this.#sales.set(guardian, sale);
    }

    getSale(guardian: Guardian): VendorSales
    {
        return this.#sales.get(guardian);
    }

    setProperty(property: string, value: string): Vendor
    {
        this.#properties.set(property, value);
        return this;
    }

    getProperty(property: string): string
    {
        return this.#properties.get(property);
    }

    // SERIALIZATION
    public toObject(locale: string): VendorProps
    {
        let sales = {};
        this.#sales.size > 0 ? sales["armor"]["guardians"] = this.salesToObject(locale) : null;
        // TODO Modify Sales to ArmorSales

        return {
            hash: this.getHash(),
            name: this.getName(),
            color: this.getColor(),
            icon: this.getIcon("icon"),
            large_icon: this.getIcon("large_icon"),
            map_icon: this.getIcon("map_icon"),
            location: this.getLocation(),
            sales: sales

        };
    }

    private salesToObject(locale: string): GuardianProps[]
    {
        let result: GuardianProps[] = [];

        for (const [guardian, sale] of this.#sales.entries())
        {
            result.push(
                {
                    hash: guardian.hash,
                    name: useTranslation(locale)[`${guardian.hash}_name`],
                    sales: this.getSale(guardian).toObject(locale)
                }
            );
        }

        return result;
    }
}

export type VendorProps = {
    hash: string,
    name: string,
    color: string,
    icon: string,
    large_icon: string,
    map_icon: string,
    location?: string,
    custom_props?: { [property: string]: string },
    sales:
    {
        armor?: { guardians: GuardianProps[] },
        bounty?: { bounties: BountyProps[] }
    }
}

export type GuardianProps = {
    hash: string,
    name: string,
    sales: DestinyItemProps[]
}

export type BountyProps = {
    name: string,
    icon: string,
    type: string,
    description: string,
    objectives:
    [
        {
            description: string,
            completion: number
        }
    ]

}