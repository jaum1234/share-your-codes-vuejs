export default class AuthRequest
{
    constructor()
    {
        this.domain = 'http://localhost:3000/api/';
    }

    store(data)
    {
        return fetch(this.domain + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}