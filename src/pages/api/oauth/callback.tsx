import fs from "fs";

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
    const data = {
        access_token: response.access_token,
        refresh_token: response.refresh_token
    };

    fs.writeFile("src/core/Cached/OAuthTokens.json", JSON.stringify(data), err =>
    {
        if (err) console.log(err);
        console.log("Saved file!")
    });

    res.status(200).json(JSON.stringify({ code: req.query.code }));
}

// https://www.bungie.net/en/oauth/authorize?client_id=37599&response_type=code
