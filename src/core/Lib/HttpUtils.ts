import { getRefreshToken, setTokens } from "../Lib/OAuthManager";

export default class HttpUtils
{
    public static readonly BUNGIE_URL = "https://www.bungie.net/Platform";
    static readonly #API_KEY = process.env.NEXT_PUBLIC_BUNGIE_API_KEY;

    static async request(props: RequestProps)
    {
        if (!props.headers) props.headers = {};
        if (props.useApiKey)
            props.headers["X-API-KEY"] = process.env.NEXT_PUBLIC_BUNGIE_API_KEY;

        const request = await fetch(this.encode(props.url),
            {
                method: props.method,
                body: props.body,
                headers: props.headers
            });

        return await request.json();
    }

    static async requestWithAuth(props: RequestProps)
    {
        const token = await this.setTokenViaRefresh();
        if (!props.headers) props.headers = {};
        props.headers["Authorization"] = "Bearer " + token
        props.useApiKey = true;

        return await this.request(props);
    }

    /**
     * TODO MOVE THIS TO AUTH MANAGER!!
     */
    static async setTokenViaRefresh(): Promise<string>
    {
        const base64_code = Buffer.from(`${process.env.NEXT_PUBLIC_BUNGIE_OAUTH_CLIENT_ID}:${process.env.NEXT_PUBLIC_BUNGIE_OAUTH_CLIENT_SECRET}`).toString('base64');
        const refresh_token = await getRefreshToken();

        const config: RequestProps =
        {
            url: "https://www.bungie.net/Platform/App/OAuth/Token/",
            method: "POST",
            headers:
            {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + base64_code
            },
            body: "grant_type=refresh_token&refresh_token=" + refresh_token,
            useApiKey: true
        }

        try
        {
            const response = await HttpUtils.request(config);

            const at = response.access_token;
            const rt = response.refresh_token;

            setTokens(
                {
                    access_token: at,
                    refresh_token: rt
                });

            return at;
        }
        catch (e)
        {
            console.error("Could not refresh tokens!");
            console.error(e);
        }
    }

    static async requestManifest()
    {
        const config: RequestProps =
        {
            url: "https://www.bungie.net/Platform/Destiny2/Manifest/",
            method: 'GET',
            useApiKey: true
        }
        const request = await this.request(config);
        const response = await request.Response;
        return response.jsonWorldComponentContentPaths;
    }

    static async requestManifestEntity(locale = 'en', type: string)
    {
        const manifest = await this.requestManifest();
        return this._requestManifestEntity(manifest, locale, type);
    }

    static async _requestManifestEntity(manifest: object, locale: string, type: string)
    {
        const path = manifest[locale][type];
        const url = "https://www.bungie.net" + path;
        const config: RequestProps =
        {
            url: url,
            method: 'GET',
            useApiKey: true
        }
        return await this.request(config);
    }

    static encode(url: string): string
    {
        return url.replace(" ", "%20").replace("#", "%23").replace("^", "%5E");
    }
}

export type RequestProps = {
    url: string
    method: "GET" | "POST"
    headers?: { [key: string]: string }
    body?: string
    useApiKey?: boolean
};