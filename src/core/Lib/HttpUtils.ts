export default class HttpUtils
{
    public static readonly BUNGIE_URL = "https://www.bungie.net/Platform";
    static readonly #API_KEY = process.env.NEXT_PUBLIC_BUNGIE_API_KEY;
    static #bearerToken: string = "";

    constructor()
    {
        console.log(HttpUtils.#API_KEY);
    }

    static getRequest(url: string): Promise<Object>
    {
        return this.request(url);
    }

    static getOauthRequest(url: string): Promise<Object>
    {
        this.setTokenByRefresh();
        const h = new Headers();
        h.append("Authorization", "Bearer " + HttpUtils.#bearerToken);

        return this.request(url, new Headers(), "GET");
    }

    static setTokenByRefresh(): string
    {
        const url_path = HttpUtils.BUNGIE_URL + "/App/OAuth/Token/";
        //const request_body = "grant_type=refresh_token&refresh_token=" + getRefreshToken();

        return "";
    }

    // TODO Test this!!
    static async request(url: string, h?: Headers, method?: string, standart?: boolean): Promise<Object>
    {
        if (standart ?? true)
            h.append("X-API-KEY", this.#API_KEY);

        const request = new Request(url,
            {
                method: method ?? "GET",
                headers: h
            });

        const response = fetch(request).then((Response) => { Response });

        return {};
        console.log(response);
    }

    static encode(url: string): string
    {
        return url.replace(" ", "%20").replace("#", "%23").replace("^", "%5E");
    }
}