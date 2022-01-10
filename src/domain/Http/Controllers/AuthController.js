import router from "../../../router";
import HttpRequests from "./HttpController";


class AuthController extends HttpRequests
{
    constructor()
    {
        super();
    }

    async login(data)
    {
        return await fetch(this.domain + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
    }

    async register(data)
    {
        return fetch(this.domain + 'register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
    }

   async logout(token)
    {
        if (this.tokenExpired()) {
            this.refreshToken(token);
            return;
        }

        return await fetch(this.domain + 'logout', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => res.json())
        .then(() => {  
            router.push({name: 'Login'});
        })

    }

    async refreshToken(token) 
    {
        
        await fetch(this.domain + 'refreshtoken', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => res.json())
    }

}

const authHttp = new AuthController();
export { authHttp };