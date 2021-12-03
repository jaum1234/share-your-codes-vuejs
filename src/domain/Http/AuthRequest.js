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
        .then((data) => {
            this.setCookies(data);
            router.push({name: 'EditorDeCodigo'})
        });
    }

    setCookies(data)
    {
        var inTwentyMinutes = new Date(new Date().getTime() + 20 * 60 * 1000);
                        
        Cookies.set('_myapp_token', data.access_token, {expires: inTwentyMinutes});
        Cookies.set('user_id', data.user.id);
        Cookies.set('user_email', data.user.email);
        Cookies.set('user_nickname', data.user.nickname);
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
            Cookies.remove('user_email');
            Cookies.remove('user_nickname');
    
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
            Cookies.set('_myapp_token', data.access_token);
            console.log(Cookies.get('_myapp_token'))
        });
    }

}

const authHttp = new AuthRequest();
export { authHttp };