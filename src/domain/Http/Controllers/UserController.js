import HttpController from "./HttpController";

class UserController extends HttpController
{
    constructor()
    {
        super()
    }

    async update(id, data, token)
    {
        if (this.tokenExpired()) {
            this.refreshToken();
            return;
        }

        return await fetch(this.domain + 'users/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json());
        
    }

    async projetos(id, page, limit, token)
    {
        if (this.tokenExpired()) {
            this.refreshToken();
            return;
        }

        return await fetch(this.domain + 'users/' + id + '/projetos?page=' + page + '&limit=' + limit, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })
        .then(res => res.json());
    }
}

const userHttp = new UserController();
export { userHttp };