import DestinyItemArmor, { DestinyItemProps } from "./DestinyItemArmor";

export default class VendorSales
{
    #items = new Array<DestinyItemArmor>();

    getItems(): Array<DestinyItemArmor>
    {
        return this.#items;
    }

    addItem(item: DestinyItemArmor)
    {
        this.#items.push(item);
    }

    public toObject(locale: string): DestinyItemProps[]
    {
        this.#items.sort(compareArmor);

        return this.#items.map(item => item.toObject(locale));
    }
}

function compareArmor(a: DestinyItemArmor, b: DestinyItemArmor): number
{
    if (a.getType() < b.getType()) return -1;
    if (a.getType() > b.getType()) return 1;
    else return 0;
}