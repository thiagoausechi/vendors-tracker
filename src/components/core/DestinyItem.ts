import { DestinyItemSubType } from 'bungie-api-ts/destiny2';

export default class DestinyItem
{
    #properties = new Map<string, string>();
    #itemSubType: DestinyItemSubType;

    constructor(hash: string, type: DestinyItemSubType)
    {
        this.#properties.set("hash", hash);
        this.#itemSubType = type;
    }
}
