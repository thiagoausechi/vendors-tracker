import { updateFields } from "../../core/Backend/Database";
import { fetchWeeklyVendors, fetchXur, isXurActive } from "../../core/Lib/CacheManager";
import { getVendors, requestRebuild } from "../../core/Lib/DataManager";
import { HASH_XUR } from "../../core/Lib/HashLexicon";

export default async function handler(req, res)
{
    console.log("======================================================================");
    console.log("Request Received");

    if (req.query.auth)
    {
        const auth = req.query.auth;
        const env_auth = process.env.NEXT_PUBLIC_UPDATE_AUTH_KEY;

        if (auth === env_auth)
        {
            console.log("Is Xur Update? " + req.query.xur);
            if (req.query.xur === `true`)
            {
                if (isXurActive())
                {
                    if (!(await getVendors()["en"].some((v) => v.hash == HASH_XUR)))
                        await requestRebuild();
                    else console.log("Xûr's data already cached. Skipped action.");
                }
                else console.log("Xûr not arrived yet. Skipped action.");

            }
            else
                await requestRebuild();
        }

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