import {defineAsyncComponent} from 'vue';
const uis = import.meta.glob('../components/uis/*.vue');

export default {
    install: (app) => {
        for (let path in uis) {
            let fileName = path.match(/.*\/(.*)\.vue$/)[1];
            if (fileName){
                app.component(fileName, defineAsyncComponent(() => import(`../components/uis/${fileName}.vue`)));
            }
        }
    },
};

