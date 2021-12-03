import HttpRequests from "./HttpRequests";
import Cookies from "js-cookie";

class ProjectRequests extends HttpRequests
{
    constructor()
    {
        super();
    }

    index(page, limit)
    {
        return fetch(this.domain + 'projetos?page=' + page + '&limit=' + limit, {method: 'GET'})
            .then(res => res.json());
    }

    store(data)
    {
        this.checkToken();

        return fetch(this.domain + 'projetos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('_myapp_token')
            },
            body: JSON.stringify(data)
        })
    }

    search(data, page)
    {
        return fetch(this.domain + 'pesquisar?q=' + data + '&page=' + page, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => res.json());
        
    }

    delete(id) {
        this.checkToken();
        
        return fetch(this.domain + 'projetos/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cookies.get('_myapp_token')
            }
        })
        .then(res => res.json());
    }
}

const projectHttp = new ProjectRequests()
export { projectHttp };