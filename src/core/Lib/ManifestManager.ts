import HttpUtils from "./HttpUtils";

export const MANIFEST_URL = "https://www.bungie.net/Platform/Destiny2/Manifest/";
export const manifest = {};

export const loadManifest = async () =>
{
    try
    {
        console.log("\n Successfully got Manifest");
        const request = await HttpUtils.request(
            {
                url: MANIFEST_URL,
                method: "GET",
                useApiKey: true
            });
        return request.Response.jsonWorldComponentContentPaths;
    }
    catch (e)
    {
        console.error("\n Could not get Manifest.");
        console.error(e);
    }
}