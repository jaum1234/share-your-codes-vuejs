import Cookies from "js-cookie";
import { parseToken } from "../../../mixins";

export default class HttpController
{
    constructor()
    {
        if (process.env.VUE_APP_ENV == 'prod') {
            this.domain = 'https://shareyourcodes.com/api/';
        } else if (process.env.VUE_APP_ENV == 'local') {
            this.domain = 'http://localhost:3000/api/'
        }
        this.token = parseToken.methods.parse()
        this.tokenExpiresAt = Cookies.get('token_expires_at');
    }
    
    

    tokenExpired()
    {
        return new Date().getTime() >= Cookies.get('token_expires_at');
    }
}

const httpRequest = new HttpController();
export { httpRequest };