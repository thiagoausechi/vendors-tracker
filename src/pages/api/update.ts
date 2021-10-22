export default async function handler(req, res)
{
    console.log("======================================================================");
    console.log("Request Received");

    if (req.query.auth)
    {
        const auth = req.query.auth;
        const env_auth = process.env.NEXT_PUBLIC_UPDATE_AUTH_KEY;

        console.log("Is Xur Update? " + req.query.xur);
        if (auth === env_auth)
        {
            fetchVendorsData("Updated Cache");
        }
        else
            console.log("Wrong Auth code!");

        res.status(200).json({});
        return;
    }
    else
    {
        console.error("Something went wrong.");
        res.status(200).json({});
        return;
    }
}

function fetchVendorsData(arg0: string)
{
    throw new Error("Function not implemented.");
}
