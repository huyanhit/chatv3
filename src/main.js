import { createApp }    from 'vue'
import App              from './App.vue'
import mitt             from "mitt";
import VueSocketIO      from 'vue-3-socket.io'
import axios            from 'axios'
import VueAxios         from 'vue-axios'
import router           from './common/Router.js'
import store            from './store/store.js'

import viMessage        from './lang/vi.json'
import enMessage        from './lang/en.json'
import jpMessage        from './lang/jp.json'

import filters          from './common/Filter.js'
import api              from './common/ApiService.js'
import { createI18n }   from 'vue-i18n'

import { createVuetify }  from 'vuetify'
import { mdi }            from 'vuetify/iconsets/mdi'
import * as components  from 'vuetify/components'
import * as directives  from 'vuetify/directives'
// import uiCustomer       from './plugins/ui-customers';

import '@mdi/font/css/materialdesignicons.css' 
import 'vuetify/styles'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap'

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';

import './assets/css/main.css'

const app     = createApp(App);
const vuetify = createVuetify({
    components, directives,
    icons: {
        defaultSet: 'mdi',
        sets: {mdi}
    },
})
const emitter = mitt();
const i18n = createI18n({
    legacy: false,
    locale: "en",
    globalInjection: true,
    messages: {
        en: enMessage,
        vi: viMessage,
        jp: jpMessage
    }
});

app.config.globalProperties.event   = emitter;
app.config.globalProperties.filters = filters;
app.config.globalProperties.api     = api;

app.config.devtools = import.meta.env.VITE_APP_DEBUG_TOOL
app.config.debug    = import.meta.env.VITE_APP_DEBUG_TOOL
app.config.silent   = import.meta.env.VITE_APP_DEBUG_TOOL

app.use(new VueSocketIO({debug: import.meta.env.VITE_APP_DEBUG_SOCKET, connection: import.meta.env.VITE_APP_API_SOCKET}))
app.use(i18n);
// app.use(uiCustomer);
app.use(vuetify);
app.use(router);
app.use(store);
app.use(VueAxios, axios)
app.mount('#app')
