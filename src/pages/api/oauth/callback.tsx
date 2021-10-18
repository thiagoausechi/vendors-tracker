import { doc, setDoc } from "firebase/firestore";
import db from "../../../core/Backend/Config";

export default async function handler(req, res)
{
    if (req.query.code)
    {
        console.log(`Receving a new OAuth Code. [${req.query.code}]`)

        const request = await fetch("https://www.bungie.net/Platform/App/OAuth/Token/",
            {
                method: "POST",
                body: "grant_type=authorization_code&code=" + req.query.code,
                headers:
                {
                    "X-API-KEY": process.env.NEXT_PUBLIC_BUNGIE_API_KEY,
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " +
                        Buffer.from(`${process.env.NEXT_PUBLIC_BUNGIE_OAUTH_CLIENT_ID}:${process.env.NEXT_PUBLIC_BUNGIE_OAUTH_CLIENT_SECRET}`).toString('base64')
                }
            });
        const response = await request.json();

        const at = response.access_token;
        const rt = response.refresh_token;

        console.log("Access Token: " + at);
        console.log("Refresh Token: " + rt);

        await setDoc(doc(db, "tokens", "0"), { access_token: at, refresh_token: rt });

        res.status(200).json(response);
    }
    else
    {
        res.status(400).json({ req, res });
    }
}
