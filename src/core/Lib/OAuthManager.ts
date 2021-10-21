import { getValue, setValue } from "../Backend/Database";

export default class OAuthManager
{
    async setTokens(tokens: Tokens)
    {
        setValue("tokens", "0",
            {
                access_token: tokens.access_token,
                refresh_token: tokens.refresh_token
            });
    }

    async getTokens(): Promise<Tokens>
    {
        return {
            access_token: await this.getAccessToken(),
            refresh_token: await this.getRefreshToken()
        };
    }

    async getAccessToken(): Promise<string>
    {
        return await getValue("tokens", "0", "access_token");
    }

    async getRefreshToken(): Promise<string>
    {
        return await getValue("tokens", "0", "refresh_token");
    }
}

type Tokens =
{
    access_token: string
    refresh_token: string
}