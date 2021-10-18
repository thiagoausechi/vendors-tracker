export default class DestinyItem
{
    #properties = new Map<string, string>();
    #itemSubType: number;

    constructor(hash: string, type: number)
    {
        this.#properties.set("hash", hash);
        this.#itemSubType = type;
    }
}
