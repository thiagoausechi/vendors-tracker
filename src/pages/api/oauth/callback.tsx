import { initializeApp } from "firebase/app";

export default async function handler(req, res)
{
    const request = await fetch("https://www.bungie.net/Platform/App/OAuth/Token/",
        {
            method: "POST",
            headers:
            {
                "X-API-KEY": process.env.NEXT_PUBLIC_BUNGIE_API_KEY,
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " +
                    Buffer.from(`${process.env.NEXT_PUBLIC_BUNGIE_OAUTH_CLIENT_ID}:${process.env.NEXT_PUBLIC_BUNGIE_OAUTH_CLIENT_SECRET}`).toString('base64')
            },
            body: "grant_type=authorization_code&code=" + req.query.code
        });
    const response = await request.json();


    const access_token = response.access_token;
    const refresh_token = response.refresh_token;


    res.status(200).json("");
}
