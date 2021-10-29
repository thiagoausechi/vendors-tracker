import { callOutside } from "../../core/test";

export default async function handler(req, res)
{
    console.log(call());
    console.log(callOutside());

    res.status(200).json({});
}

async function call()
{
    console.log("Function inside file");
    return "a";
}