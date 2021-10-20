export default async function handler(req, res)
{
    console.log("Request" + req);
    res.status(200).json({});
}