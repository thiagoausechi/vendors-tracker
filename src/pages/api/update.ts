import { updateFields } from "../../core/Backend/Database";
import { fetchWeeklyVendors } from "../../core/Lib/CacheManager";
import { getVendors } from "../../core/Lib/DataManager";

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
            const updated_data = await fetchWeeklyVendors();
            if (updated_data)
            {
                console.log("Updating vendors data.");
                try
                {
                    await updateFields("vendors", "data",
                        { cache: JSON.stringify(updated_data) });
                }
                catch (e)
                {
                    console.log("Error writing Vendos Cache!")
                    console.log(e);
                }
            }
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