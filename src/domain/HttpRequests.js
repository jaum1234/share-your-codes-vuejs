export default class HttpRequests
{
    constructor()
    {
        this.domain = 'http://localhost:3000/api/';
    }

    index()
    {
        return fetch(this.domain + 'projetos', {method: 'GET'})
            .then(res => res.json());
    }

    store(data)
    {
        return fetch(this.domain + 'projetos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}