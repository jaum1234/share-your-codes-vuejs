import Cookies from "js-cookie";
//import router from '../../../router/index.js';

export default class HttpController
{
    constructor()
    {
        if (process.env.VUE_APP_ENV == 'prod') {
            this.domain = 'https://shareyourcodes.com/api/';
        } else if (process.env.VUE_APP_ENV == 'local') {
            this.domain = 'http://localhost:3000/api/'
        }

        this.token = Cookies.get('_myapp_token');
        this.tokenExpiresAt = Cookies.get('token_expires_at');
    }

    async refreshToken() 
    {
        await fetch(this.domain + 'refreshtoken', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.token
            }
        })
        .then(res => res.json())
        .then(res => {
            Cookies.set('_myapp_token', res.data.token.access_token);
            Cookies.set('token_expires_at', new Date(new Date().getTime() + 60*60*1000).getTime());

            this.token = res.data.token.access_token;
        });
    }

    tokenExpired()
    {
        return new Date().getTime() >= Cookies.get('token_expires_at');
    }
}

const httpRequest = new HttpController();
export { httpRequest };