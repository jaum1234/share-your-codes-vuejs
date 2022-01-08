//import { store } from "@/store";
import HttpController from "./HttpController";

class ProjectController extends HttpController
{
    constructor()
    {
        super();
        //this.token = store.getters.token;
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

    async store(data, token)
    {
        console.log("dados do projeto:  ", data)
        if (this.tokenExpired()) {
            this.refreshToken(token);
            return;
        }
           
        return await fetch(this.domain + 'projetos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token//this.token
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json());
    }

    async update(data, id, token)
    {
        if (this.tokenExpired()) {
            this.refreshToken(token);
            return;
        }

        return await fetch(this.domain + 'projetos/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token//this.token
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

    async delete(id, token) 
    {
        if (this.tokenExpired()) {
            this.refreshToken(token);
            return;
        }
        
        return await fetch(this.domain + 'projetos/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token//this.token
            }
        })
    }
}

const projectHttp = new ProjectController()
export { projectHttp };