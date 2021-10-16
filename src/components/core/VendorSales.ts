import DestinyItemArmor from "./DestinyItemArmor";

export default class VendorSales
{
    #items = new Array<DestinyItemArmor>();

    get items(): Array<DestinyItemArmor>
    {
        return this.#items;
    }

    addItem(item: DestinyItemArmor)
    {
        this.#items.push(item);
    }
}