import { updateFields } from "../../core/Backend/Database";
import { fetchWeeklyVendors, fetchXur } from "../../core/Lib/CacheManager";

export default async function handler(req, res)
{
    console.log("======================================================================");
    console.log("Request Received");

    if (req.query.auth)
    {
        const auth = req.query.auth;
        const env_auth = process.env.NEXT_PUBLIC_UPDATE_AUTH_KEY;
        let msg = "";

        if (auth === env_auth)
        {
            let updated_data;

            console.log("Is Xur Update? " + req.query.xur);
            if (req.query.xur === `true`)
                updated_data = await fetchXur();
            else
                updated_data = await fetchWeeklyVendors();

            console.log(updated_data ? "Updated data received." : "No updated data.");
            if (updated_data)
            {
                console.log("Updating vendors data on cache.");
                try
                {
                    await updateFields("vendors", "data",
                        { cache: JSON.stringify(updated_data) });

                    msg = "New data saved to cached";
                    // Call Vercel rebuild
                }
                catch (e)
                {
                    console.log("Error writing Vendos Cache!")
                    console.log(e);
                }
            }
            else msg = "No updated data.";
        }

        res.status(200).json({ message: msg });
        return;
    }
    else
    {
        console.error("Something went wrong.");
        res.status(200).json({});
        return;
    }
}