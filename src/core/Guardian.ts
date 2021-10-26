import { HASH_HUNTER, HASH_TITAN, HASH_WARLOCK } from "../core/Lib/HashLexicon";

export default class Guardian 
{
    static readonly TITAN = new Guardian(0, HASH_TITAN);
    static readonly HUNTER = new Guardian(1, HASH_HUNTER);
    static readonly WARLOCK = new Guardian(2, HASH_WARLOCK);
    static readonly LIST: Guardian[] = [this.TITAN, this.HUNTER, this.WARLOCK];

    private constructor(public readonly classType: number, public readonly hash: string)
    {
    }
}