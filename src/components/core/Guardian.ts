export default class Guardian 
{
    static readonly TITAN = new Guardian(0, "3655393761");
    static readonly HUNTER = new Guardian(1, "671679327");
    static readonly WARLOCK = new Guardian(2, "2271682572");

    private constructor(public readonly classType: number, public readonly hash: string)
    {
    }
}