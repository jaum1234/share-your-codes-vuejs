import Cookies from "js-cookie";
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
        .then(response => response.json())
    }

    setCookies(res)
    {   
        var inTwentyMinutes =  new Date(new Date().getTime() + 60*60*1000);    
        console.log(res);              

        Cookies.set('_myapp_token', res.data.token.access_token);
        Cookies.set('user_id', res.data.user.id);
        Cookies.set('user_name', res.data.user.name);
        Cookies.set('user_nickname', res.data.user.nickname);
        Cookies.set('token_expires_at', inTwentyMinutes.getTime());
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

   async logout()
    {
        if (new Date().getTime() >= Cookies.get('token_expires_at')) {
            this.refreshToken();
            return;
        }

        return await fetch(this.domain + 'logout', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('_myapp_token')
            }
        })
        .then(res => res.json())
        .then(() => {
            Cookies.remove('_myapp_token');
            Cookies.remove('token_expires_at');
            Cookies.remove('user_name');
            Cookies.remove('user_nickname');
            
            router.push({name: 'Login'});
        })

    }
}

const authHttp = new AuthController();
export { authHttp };