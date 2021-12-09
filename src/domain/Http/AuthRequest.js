import Cookies from "js-cookie";
import router from "../../router";
import HttpRequests from "./HttpRequests";

class AuthRequest extends HttpRequests
{
    constructor()
    {
        super();
    }

    login(data)
    {
        return fetch(this.domain + 'login', {
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
        var inTwentyMinutes =  new Date(new Date().getTime() + 20 * 60 * 1000);    
        console.log(res);              

        Cookies.set('_myapp_token', res.data.access_token);
        Cookies.set('user_id', res.data.user.id);
        Cookies.set('user_name', res.data.user.name);
        Cookies.set('user_nickname', res.data.user.nickname);
        Cookies.set('token_expires_at', inTwentyMinutes.getTime());
    }

    register(data)
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

    logout()
    {
        return fetch(this.domain + 'logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('_myapp_token')
            }
        })
        .then(res => res.json())
        .then(() => {
            Cookies.remove('_myapp_token');
            Cookies.remove('token_expires_at');
            Cookies.remove('user_name');
            Cookies.remove('user_nickname');
            console.log(this.interval);
            clearInterval(this.interval);
    
            router.push({name: 'Login'});
        })

    }

    refreshToken()
    {
        return fetch(this.domain + 'refreshtoken', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('_myapp_token')
            }
        })
        .then(res => res.json())
        .then(data => {
            var inAproxFiveMinutes =  new Date(new Date().getTime() + 4.8 * 60 * 1000);                  

            Cookies.set('_myapp_token', data.access_token);
            Cookies.set('token_expires_at', inAproxFiveMinutes.getTime());
            console.log(Cookies.get('_myapp_token'))
        });
    }

}

const authHttp = new AuthRequest();
export { authHttp };