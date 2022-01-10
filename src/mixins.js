import Cookies from "js-cookie"

export const tokenParser = {
    methods: {
        parseAccessToken() {
            if (Cookies.get('vuex'))
                return JSON.parse(Cookies.get('vuex')).usersModule.token.access_token;
            
            return;
        },
        parseTokenExpirationTime() {
            if (Cookies.get('vuex'))
                return JSON.parse(Cookies.get('vuex')).usersModule.token.token_expires_at;
            
            return;
        }
    }
}