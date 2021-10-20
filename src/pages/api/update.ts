export default async function handler(req, res)
{
    await console.log(req.json());
    res.status(200).json({});
}