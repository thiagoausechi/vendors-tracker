import HttpUtils from "./HttpUtils";

export const manifest = {};

export const loadManifest = async () =>
{
    try
    {
        console.log("\n Successfully got Manifest");
        const request = await HttpUtils.request(
            { url: ManifestManager.MANIFEST_URL, useApiKey: true });
        return request.Response.jsonWorldComponentContentPaths;
    }
    catch (e)
    {
        console.error("\n Could not get Manifest.");
        console.error(e);
    }
}




export default class ManifestManager
{
    public static readonly MANIFEST_URL = "https://www.bungie.net/Platform/Destiny2/Manifest/";
    #worldComponents = new Map<string, object>();
    #manifest: object;

    constructor()
    {
        this.#fetchManifest().then((r) => this.#manifest = r);
        console.log(this.#manifest);
    }

    async #fetchManifest()
    {
        try
        {
            console.log("\n Successfully got Manifest");
            const request = await HttpUtils.request(
                { url: ManifestManager.MANIFEST_URL, useApiKey: true });
            return request.Response.jsonWorldComponentContentPaths;
        }
        catch (e)
        {
            console.error("\n Could not get Manifest.");
            console.error(e);
        }
    }
}