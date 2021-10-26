import { HASH_DISCIPLINE, HASH_INTELLECT, HASH_MOBILITY, HASH_RECOVERY, HASH_RESILIENCE, HASH_STRENGHT, HASH_XUR } from "./Lib/HashLexicon";

export default class ArmorStatus 
{
    static readonly MOBILITY = new ArmorStatus(0, HASH_MOBILITY);
    static readonly RESILIENCE = new ArmorStatus(1, HASH_RESILIENCE);
    static readonly RECOVERY = new ArmorStatus(2, HASH_RECOVERY);
    static readonly DISCIPLINE = new ArmorStatus(3, HASH_DISCIPLINE);
    static readonly INTELLECT = new ArmorStatus(4, HASH_INTELLECT);
    static readonly STRENGHT = new ArmorStatus(5, HASH_STRENGHT);
    static readonly LIST: ArmorStatus[] = [this.MOBILITY, this.RESILIENCE, this.RECOVERY, this.DISCIPLINE, this.INTELLECT, this.STRENGHT];

    private constructor(public readonly ordinal: number, public readonly hash: string)
    {
    }
}