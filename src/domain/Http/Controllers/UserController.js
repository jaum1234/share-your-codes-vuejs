import HttpController from "./HttpController";
class UserController extends HttpController
{
    constructor()
    {
        super()
    }

    async update(id, data)
    {
        if (this.tokenExpired()) {
            this.refreshToken();
            return;
        }

        return await fetch(this.domain + 'users/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json());
        
    }

    async projetos(id, page, limit)
    {
        if (this.tokenExpired()) {
            this.refreshToken();
            return;
        }

        return await fetch(this.domain + 'users/' + id + '/projetos?page=' + page + '&limit=' + limit, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.token
            },
        })
        .then(res => res.json());
    }
}

const userHttp = new UserController();
export { userHttp };