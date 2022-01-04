import HttpController from "./HttpController";

class ProjectController extends HttpController
{
    constructor()
    {
        super();
    }

    async index(page, limit)
    {
        return await fetch(this.domain + 'projetos?page=' + page + '&limit=' + limit, {
            method: 'GET'
        })
        .then(res => res.json());
    }

    async show(id)
    {
        return await fetch(this.domain + 'projetos/' + id, {
            method: 'GET',
        })
        .then(res => res.json());
    }

    async store(data)
    {
        if (this.tokenExpired()) {
            this.refreshToken();
            return;
        }
            
        return await fetch(this.domain + 'projetos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json());
    }

    async update(data, id)
    {
        if (this.tokenExpired()) {
            this.refreshToken();
            return;
        }

        return await fetch(this.domain + 'projetos/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json());
    }

    async search(data, page)
    {
        return await fetch(this.domain + 'pesquisar?q=' + data + '&page=' + page, {
            method: 'GET',
        })
        .then(res => res.json());
    }

    async delete(id) 
    {
        if (this.tokenExpired()) {
            this.refreshToken();
            return;
        }
        
        return await fetch(this.domain + 'projetos/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + this.token
            }
        })
    }
}

const projectHttp = new ProjectController()
export { projectHttp };