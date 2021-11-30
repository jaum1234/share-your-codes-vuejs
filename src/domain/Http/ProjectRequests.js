import HttpRequests from "./HttpRequests";
import Cookies from "js-cookie";

export default class ProjectRequests extends HttpRequests
{
    constructor()
    {
        super();
    }

    index()
    {
        return fetch(this.domain + 'projetos', {method: 'GET'})
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
        });
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