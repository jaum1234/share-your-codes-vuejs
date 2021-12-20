import HttpController from "./HttpController";
import Cookies from "js-cookie";

class UserController extends HttpController
{
    constructor()
    {
        super()
    }

    async update(id, data)
    {
        if (new Date().getTime() >= Cookies.get('token_expires_at')) {
            this.refreshToken();
        }

        return await fetch(this.domain + 'users/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('_myapp_token')
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json());
        
    }

    async projetos(id, page, limit)
    {
        if (new Date().getTime() >= Cookies.get('token_expires_at')) {
            this.refreshToken();
        }

        return await fetch(this.domain + 'users/' + id + '/projetos?page=' + page + '&limit=' + limit, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('_myapp_token')
            },
        })
        .then(res => res.json());
    }
}

const userHttp = new UserController();
export { userHttp };