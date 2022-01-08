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
        console.log("Dadosd e login: ", data)
        return await fetch(this.domain + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
    }

    //setCookies(res)
    //{   
    //    Cookies.set('_myapp_token', res.data.token.access_token);
    //    Cookies.set('user_id', res.data.user.id);
    //    Cookies.set('user_name', res.data.user.name);
    //    Cookies.set('user_nickname', res.data.user.nickname);
    //    Cookies.set('token_expires_at', new Date(new Date().getTime() + 60*60*1000).getTime());
    //    
    //}

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
            Cookies.remove('_myapp_token');
            Cookies.remove('token_expires_at');
            Cookies.remove('user_name');
            Cookies.remove('user_nickname');
            
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
        //.then(res => {
        //    //Cookies.set('_myapp_token', res.data.token.access_token);
        //    //Cookies.set('token_expires_at', new Date(new Date().getTime() + 60*60*1000).getTime());
//
        //    //this.token = res.data.token.access_token;
        //});
    }
}

const authHttp = new AuthController();
export { authHttp };