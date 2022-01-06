import Cookies from "js-cookie"

export const parseToken = {
    methods: {
        parse() {
            if (Cookies.get('vuex'))
                return JSON.parse(Cookies.get('vuex')).token.access_token;
            
            return;
        }
    }
}