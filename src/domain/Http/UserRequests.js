import HttpRequests from "./HttpRequests";
import Cookies from "js-cookie";

class UserRequests extends HttpRequests
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
        .then(res => res.json())
        .then(data => {
            Cookies.set('user_nickname', data.dados.new_nickname);
            Cookies.set('user_name', data.dados.new_name);
        });
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

const userHttp = new UserRequests();
export { userHttp };