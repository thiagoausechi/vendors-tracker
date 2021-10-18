export default async function handler(req, res)
{
    const response = await fetch("https://www.bungie.net/Platform/App/OAuth/Token/",
        {
            method: "POST",
            body: "grant_type=authorization_code&code=" + req.query.code,
            headers:
            {
                "X-API-KEY": process.env.NEXT_PUBLIC_BUNGIE_API_KEY,
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " +
                    Buffer.from(`${process.env.NEXT_PUBLIC_BUNGIE_OAUTH_CLIENT_ID}:
                    ${process.env.NEXT_PUBLIC_BUNGIE_OAUTH_CLIENT_SECRET}`).toString('base64')
            }
        });
    const data = await response.json();

    res.status(200).json(data)
    /*
        const xhr = new XMLHttpRequest();
    
        xhr.open("POST", "https://www.bungie.net/Platform/App/OAuth/Token/", true);
    
        xhr.setRequestHeader("X-API-KEY", process.env.NEXT_PUBLIC_BUNGIE_API_KEY);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Authorization", "Basic " +
            Buffer.from(`${process.env.NEXT_PUBLIC_BUNGIE_OAUTH_CLIENT_ID}:
            ${process.env.NEXT_PUBLIC_BUNGIE_OAUTH_CLIENT_SECRET}`).toString('base64'));
    
        xhr.onreadystatechange = function ()
        { // Chama a função quando o estado mudar.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200)
            {
                // Requisição finalizada. Faça o processamento aqui.
    
                res.status(200).json(this.response);
            }
        }
    
        xhr.send("grant_type=authorization_code&code=" + req.query.code);
    */
}

// https://www.bungie.net/en/oauth/authorize?client_id=37599&response_type=code
