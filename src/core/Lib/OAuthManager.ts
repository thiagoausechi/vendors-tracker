import { getValue, setFields } from "../Backend/Database";

export async function setTokens(tokens: Tokens)
{
    setFields("tokens", "0",
        {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token
        });
}

export async function getTokens(): Promise<Tokens>
{
    return {
        access_token: await this.getAccessToken(),
        refresh_token: await this.getRefreshToken()
    };
}

export async function getAccessToken(): Promise<string>
{
    return await getValue("tokens", "0", "access_token");
}

export async function getRefreshToken(): Promise<string>
{
    return await getValue("tokens", "0", "refresh_token");
}

type Tokens =
    {
        access_token: string
        refresh_token: string
    }