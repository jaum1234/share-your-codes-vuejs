import HttpController from "./HttpController";
import Cookies from "js-cookie";

class UserController extends HttpController
{
    constructor()
    {
        super()
    }

    update(id, data)
    {
        this.checkToken();

        return fetch(this.domain + 'users/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('_myapp_token')
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json());
        
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

const userHttp = new UserController();
export { userHttp };