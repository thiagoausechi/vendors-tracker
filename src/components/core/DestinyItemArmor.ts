import DestinyItem from "./DestinyItem";
import Guardian from "./Guardian";
import ArmorStatus from "./ArmorStatus";
import { DestinyItemSubType } from 'bungie-api-ts/destiny2';

export default class DestinyItemArmor extends DestinyItem
{
    #status = new Map<ArmorStatus, number>();
    #classType: Guardian;

    constructor(hash: string, type: DestinyItemSubType, classType: Guardian)
    {
        super(hash, type);
        this.#classType = classType;
    }

    setMobility(value: number)
    {
        this.#status.set(ArmorStatus.MOBILITY, value);
    }

    setResilience(value: number)
    {
        this.#status.set(ArmorStatus.RESILIENCE, value);
    }

    setRecovery(value: number)
    {
        this.#status.set(ArmorStatus.RECOVERY, value);
    }

    setDiscipline(value: number)
    {
        this.#status.set(ArmorStatus.DISCIPLINE, value);
    }

    setIntellect(value: number)
    {
        this.#status.set(ArmorStatus.INTELLECT, value);
    }

    setStrenght(value: number)
    {
        this.#status.set(ArmorStatus.STRENGHT, value);
    }

    setStatus(m: number, r: number, e: number, d: number, i: number, s: number)
    {
        this.setMobility(m);
        this.setResilience(r);
        this.setRecovery(e);
        this.setDiscipline(d);
        this.setIntellect(i);
        this.setStrenght(s);
    }

    getTotalStatus(): number
    {
        let total = 0;
        for (let value of this.#status.values())
            total += value;
        return total;
    }

    get classType(): Guardian
    {
        return this.#classType;
    }

}

export const VALID_ARMOR = [26 /*HelmetArmor*/, 27 /*GauntletsArmor*/, 28 /*ChestArmor*/, 29 /*LegArmor*/];