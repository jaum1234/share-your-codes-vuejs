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
            let counter = 0;

            this.interval = setInterval(() => {
                var now = new Date();
                
                if (now.getTime() >= Cookies.get('token_expires_at')) {
                    counter++;
                    console.log(counter);
                    if (counter == 3) {
                        this.logout();
                        return;
                    }

                    authHttp.refreshToken();
                }

            }, 1000);

            router.push({name: 'EditorDeCodigo'})    
        });
    }

    setCookies(data)
    {   
        var inTwentyMinutes =  new Date(new Date().getTime() + 20 * 60 * 1000);    
        console.log(data.access_token);              

        Cookies.set('_myapp_token', data.access_token);
        Cookies.set('user_id', data.user.id);
        Cookies.set('user_name', data.user.name);
        Cookies.set('user_nickname', data.user.nickname);
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
            var inTwentyMinutes =  new Date(new Date().getTime() + 20 * 60 * 1000);                  

            Cookies.set('_myapp_token', data.access_token);
            Cookies.set('token_expires_at', inTwentyMinutes.getTime());
            console.log(Cookies.get('_myapp_token'))
        });
    }

}

const authHttp = new AuthRequest();
export { authHttp };