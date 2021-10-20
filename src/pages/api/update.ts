export default async function handler(req, res)
{
    console.log("===================================================================");
    const auth = req.query.auth;
    const env_auth = process.env.NEXT_PUBLIC_UPDATE_AUTH_KEY;

    console.log(req.query);
    console.log("auth: " + auth);
    console.log("update key: " + env_auth);
    console.log("bungie key: " + process.env.NEXT_PUBLIC_BUNGIE_API_KEY);

    if (auth === env_auth)
    {
        console.log("Do some code!");
    }
    else
    {
        console.error("Something went wrong")
    }

    res.status(200).json({});
}