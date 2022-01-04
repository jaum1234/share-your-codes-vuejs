export default class Sharer
{
    constructor()
    {
        this.siteDomain = 'http://localhost:8080';
    }

    share(baseShareUrl, linkToBeShared) 
    {
        window.open(baseShareUrl + linkToBeShared);
    }
    
    shareOnWpp(linkToBeShared)
    {
        window.open('https://api.whatsapp.com/send?text=' + this.siteDomain + linkToBeShared);
    }

    shareOntwitter(linkToBeShared)
    {
        window.open('https://twitter.com/intent/tweet?url=' + this.siteDomain + linkToBeShared);
    }
}

const sharer = new Sharer();

export { sharer };


