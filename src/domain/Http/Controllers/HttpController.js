import Cookies from "js-cookie";
import router from '../../../router/index.js';

export default class HttpController
{
    constructor()
    {
        this.domain = 'http://localhost:3000/api/';
    }

    checkToken()
    {
        if (!Cookies.get('_myapp_token')) {
            router.push({name: 'Login'})
            return;
        }
        
    }
}