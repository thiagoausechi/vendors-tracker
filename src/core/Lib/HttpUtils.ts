export default class HttpUtils
{
    public static readonly BUNGIE_URL = "https://www.bungie.net/Platform";
    static readonly #API_KEY = process.env.NEXT_PUBLIC_BUNGIE_API_KEY;
    static #bearerToken: string = "";

    static async request(props: RequestProps)
    {
        if (props.useApiKey) props.headers["X-API-KEY"] = process.env.NEXT_PUBLIC_BUNGIE_API_KEY;
        
        const request = await fetch(HttpUtils.encode(props.url),
            {
                method: props.method,
                body: props.body,
                headers: props.headers
            });

        return await request.json();
    }

    static encode(url: string): string
    {
        return url.replace(" ", "%20").replace("#", "%23").replace("^", "%5E");
    }
}

export type RequestProps = {
    url: string
    method: "GET" | "POST"
    headers: {[key: string]: string}
    body?: string
    useApiKey?: boolean
};