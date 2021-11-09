import DestinyItemArmor from "./DestinyItemArmor";
import Guardian from "./Guardian";
import Vendor from "./Vendor";
import { HASH_XUR } from "../core/Lib/HashLexicon";

export default class XurVendor extends Vendor
{
    #exotic = new Map<Guardian, DestinyItemArmor>();

    constructor()
    {
        super(HASH_XUR);
    }

    setLocationInitials(value: string): Vendor
    {
        return super.setProperty("location_initials", value);
    }

    getLocationInitials(): string
    {
        return super.getProperty("location_initials");
    }

    setExoticSale(guardian: Guardian, sale: DestinyItemArmor): Vendor
    {
        this.#exotic.set(guardian, sale);
        return this;
    }

    getExoticSale(guardian: Guardian): DestinyItemArmor
    {
        return this.#exotic.get(guardian);
    }

    public toObject(locale: string)
    {
        let result = super.toObject(locale);
        result['custom_props'] = { location_initials: this.getLocationInitials() };

        Guardian.LIST.map(guardian =>
        {
            result['sales']['armor']['guardians'][guardian.classType]['exotic'] =
                this.getExoticSale(guardian).toObject(locale);
        });

        return result;
    }

}