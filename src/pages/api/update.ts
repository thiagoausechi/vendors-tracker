import { getValue } from "../../core/Backend/Database";
import { isXurActive } from "../../core/Lib/CacheManager";
import { requestRebuild } from "../../core/Lib/DataManager";
import { HASH_XUR } from "../../core/Lib/HashLexicon";

export default async function handler(req, res)
{
    console.log("======================================================================");
    console.log("> Request Received");

    if (req.query.auth)
    {
        const auth = req.query.auth;
        const env_auth = process.env.NEXT_PUBLIC_UPDATE_AUTH_KEY;

        if (auth === env_auth)
        {
            console.log("Is Xûr Update? " + req.query.xur);
            if (req.query.xur === `true`)
            {
                console.log("> Initiating Xûr rebuild request process.");
                const xur_location = await isXurActive();

                if (xur_location)
                {
                    console.log(`Xûr arrived at location: ${xur_location.x_location_initials}`);
                    const cache = await getValue("vendors", "data", "cache");
                    if (cache !== "")
                    {
                        const cached_data = JSON.parse(cache)
                        if (cached_data)
                        {
                            const isXurCached = cached_data["en"].some((v) => v.hash == HASH_XUR);
                            console.log(`Is Xûr Cached? ${isXurCached}`);

                            if (!isXurCached)
                                await requestRebuild();
                            else 
                            {
                                console.log("Xûr's data already cached. Skipped action.");
                                res.status(200).json({});
                                return;
                            }
                        }
                        else
                        {
                            console.error("> No cached data founded. Calling rebuild.");
                            await requestRebuild();
                            res.status(200).json({});
                            return;
                        }
                    }
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