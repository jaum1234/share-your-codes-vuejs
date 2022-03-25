import { tokenParser } from "../../../mixins";

export default class HttpController
{
    constructor()
    {
        if (process.env.VUE_APP_ENV == 'prod') {
            this.domain = 'https://share-your-codes-server.herokuapp.com/api/';
        } else if (process.env.VUE_APP_ENV == 'local') {
            this.domain = 'http://localhost:3000/api/'
        }
    }

    async refreshToken(token) 
    {
        return await fetch(this.domain + 'refreshtoken', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => res.json())
    }
    
    tokenExpired()
    {
        return new Date().getTime() >= tokenParser.methods.parseTokenExpirationTime();
    }
    
}

const httpRequest = new HttpController();
export { httpRequest };