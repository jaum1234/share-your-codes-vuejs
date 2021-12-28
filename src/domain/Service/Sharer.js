export default class Sharer
{
    share(baseShareUrl, linkToBeShared) 
    {
        window.open(baseShareUrl + linkToBeShared);
    }
    
    shareOnWpp(linkToBeShared)
    {
        window.open('https://api.whatsapp.com/send?text=http://localhost:8080' + linkToBeShared);
    }

    shareOntwitter(linkToBeShared)
    {
        window.open('https://twitter.com/intent/tweet?url=http://localhost:8080' + linkToBeShared);
    }
}

const sharer = new Sharer();

export { sharer };


