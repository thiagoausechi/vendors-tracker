import Guardian from "./Guardian";
import ArmorStatus from "./ArmorStatus";
import { useTranslation } from "../lang/Language";

export default class DestinyItemArmor
{
    #BUNGIE_PREFIX = "https://www.bungie.net";
    #properties = new Map<string, string>();
    #status = new Map<ArmorStatus, number>();
    #classType: Guardian;

    constructor(hash: string, type: number, classType: Guardian)
    {
        this.#properties.set("hash", hash);
        this.#properties.set("type", "" + type);
        this.#classType = classType;
    }

    getHash(): string
    {
        return this.#properties.get("hash");
    }

    setName(value: string): DestinyItemArmor
    {
        this.#properties.set("name", value);
        return this;
    }

    getName(): string
    {
        return this.#properties.get("name");
    }

    getType(): number
    {
        return +this.#properties.get("type");
    }

    setIcon(value: string): DestinyItemArmor
    {
        this.#properties.set("icon", this.#BUNGIE_PREFIX + value);
        return this;
    }

    getIcon(): string
    {
        return this.#properties.get("icon");
    }

    setWatermark(value: string): DestinyItemArmor
    {
        this.#properties.set("watermark", this.#BUNGIE_PREFIX + value);
        return this;
    }

    getWatermark(): string
    {
        return this.#properties.get("watermark");
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

    setStatus(status: ArmorStatus, value: number)
    {
        this.#status.set(status, value);
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

    public toObject(locale: string): DestinyItemProps
    {
        return {
            item:
            {
                hash: this.getHash(),
                name: this.getName(),
                icon: this.getIcon(),
                watermark: this.getWatermark()
            },
            status: this.statusToObject(locale)
        }
    }

    private statusToObject(locale: string): StatusProps[]
    {
        let result: StatusProps[] = [];

        for (const [key, value] of this.#status.entries())
        {
            result.push({
                hash: key.hash,
                name: useTranslation(locale)[`${key.hash}_name`],
                value: value
            });
        }

        return result;
    }
}

export const VALID_ARMOR = [26 /*HelmetArmor*/, 27 /*GauntletsArmor*/, 28 /*ChestArmor*/, 29 /*LegArmor*/];
export type DestinyItemProps = {
    item:
    {
        hash: string,
        name: string,
        icon: string,
        watermark: string
    },
    status: StatusProps[]
}

type StatusProps = {
    hash: string,
    name: string,
    value: number
}