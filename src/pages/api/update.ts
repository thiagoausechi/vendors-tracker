export default async function handler(req, res)
{
    console.log(req.query);
    console.log(process.env.NEXT_PUBLIC_UPDATE_AUTH_KEY);
    console.log(req.query.auth === process.env.NEXT_PUBLIC_UPDATE_AUTH_KEY);
    res.status(200).json({});
}