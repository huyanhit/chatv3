import { getCurrentInstance } from "vue"
import { useCookies } from 'vue3-cookies';
import { useStore } from "vuex"

export default{
    useEvent:() => getCurrentInstance().appContext.config.globalProperties.event,
    useFilter:() => getCurrentInstance().appContext.config.globalProperties.filter,
    useApi:() => getCurrentInstance().appContext.config.globalProperties.api,
    useSocket:() => getCurrentInstance().appContext.config.globalProperties.$socket,
    useRoute:() => getCurrentInstance().appContext.config.globalProperties.$router,
    useCookies:() => useCookies({expire:'7d'}).cookies,
    useStore:() => useStore(),
}
