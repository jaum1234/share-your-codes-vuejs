import Cookies from "js-cookie";
import router from '../../router/index.js';
export default class HttpRequests
{
    constructor()
    {
        this.domain = 'http://ec2-3-137-191-218.us-east-2.compute.amazonaws.com/api/';
    }

    checkToken()
    {
        if (!Cookies.get('_myapp_token')) {
            router.push({name: 'Login'})
            return false;
        }
        return true;
    }
}