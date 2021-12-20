import Cookies from "js-cookie";
//import router from '../../../router/index.js';

export default class HttpController
{
    constructor()
    {
        this.domain = 'http://localhost:3000/api/';
        this.token = Cookies.get('_myapp_token');
    }

    async refreshToken() {
        await fetch(this.domain + 'refreshtoken', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.token
            }
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            Cookies.set('_myapp_token', res.data.token.access_token);
            Cookies.set('token_expires_at', new Date(new Date().getTime() + 1*60*1000).getTime());
        });
    }
}

const httpRequest = new HttpController();
export { httpRequest };