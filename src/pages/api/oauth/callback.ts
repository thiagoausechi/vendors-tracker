import HttpUtils, { RequestProps } from "../../../core/Lib/HttpUtils";

export default async function handler(req, res) {
    if (req.query.code) {
        console.log(`Receving a new OAuth Code. [${req.query.code}]`)

        const base64_code = Buffer.from(`${process.env.NEXT_PUBLIC_BUNGIE_OAUTH_CLIENT_ID}:${process.env.NEXT_PUBLIC_BUNGIE_OAUTH_CLIENT_SECRET}`).toString('base64');

        const config: RequestProps =
        {
            url: "https://www.bungie.net/Platform/App/OAuth/Token/",
            method: "POST",
            headers:
            {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + base64_code
            },
            body: "grant_type=authorization_code&code=" + req.query.code,
            useApiKey: true
        }

        try {
            const response = await HttpUtils.request(config);

            const at = response.access_token;
            const rt = response.refresh_token;

            console.log("Access Token: " + at);
            console.log("Refresh Token: " + rt);

            res.status(200).json(response);
        } catch (error) {
            res.status(400).json({ req, res });
        }
    }
    else {
        res.status(400).json({ req, res });
    }
}
