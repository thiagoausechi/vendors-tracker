export default class ArmorStatus 
{
    static readonly MOBILITY = new ArmorStatus(0, "2996146975");
    static readonly RESILIENCE = new ArmorStatus(1, "392767087");
    static readonly RECOVERY = new ArmorStatus(2, "1943323491");
    static readonly DISCIPLINE = new ArmorStatus(3, "1735777505");
    static readonly INTELLECT = new ArmorStatus(4, "144602215");
    static readonly STRENGHT = new ArmorStatus(5, "4244567218");

    private constructor(public readonly ordinal: number, public readonly hash: string)
    {
    }
}