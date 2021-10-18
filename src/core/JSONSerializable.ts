export default class JSONSerializable
{
    protected toObject() { }

    serialize()
    {
        return JSON.stringify(this.toObject());
    }

    static fromSerialized(serialized: string)
    {
        return null;
    }
}