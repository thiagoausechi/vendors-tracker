export default class HttpUtils
{
    public static readonly BUNGIE_URL = "https://www.bungie.net/Platform";
    static readonly #API_KEY = process.env.NEXT_PUBLIC_BUNGIE_API_KEY;
    static #bearerToken: string = "";

    static async request(url: string, method = 'GET' || 'POST', headers: HeadersInit, body?: string)
    {
        headers["X-API-KEY"] = process.env.NEXT_PUBLIC_BUNGIE_API_KEY;
        const request = await fetch(HttpUtils.encode(url),
            {
                method: method,
                body: body,
                headers: headers
            });

        return await request.json();
    }

    static encode(url: string): string
    {
        return url.replace(" ", "%20").replace("#", "%23").replace("^", "%5E");
    }
}