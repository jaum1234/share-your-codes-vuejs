import HttpRequests from "./HttpRequests";
import Cookies from "js-cookie";

export default class UserRequests extends HttpRequests
{
    constructor()
    {
        super()
    }

    projetos(id, page, limit)
    {
        this.checkToken();

        return fetch(this.domain + 'users/' + id + '/projetos?page=' + page + '&limit=' + limit, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('_myapp_token')
            },
        })
        .then(res => res.json());
    }
}