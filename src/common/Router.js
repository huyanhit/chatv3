import {createRouter, createWebHistory} from 'vue-router';
import {useCookies} from 'vue3-cookies';
const routes = [{
        path: '',
        component: () => import('../views/layouts/Main.vue'),
        beforeEnter: (to, from, next) => {
            const {cookies}  = useCookies();
            let access_token = cookies.get('access_token')
            if (access_token === null) {
                next('login')
            } 
            next();
        },
        children: [{
                path: '', 
                component: () => import('../views/pages/Chat.vue'),
                children: [{
                    path: 'chat',
                    name: 'chat',
                    children: [{
                        name: 'chat',
                        path: 'rid-:roomId',
                    }]
                }]
            },{
                path: 'home',
                name: 'home',
                component: () => import('../views/pages/Home.vue'),
            },{
                path: 'contact',
                name: 'contact',
                component: () => import('../views/pages/Contact.vue'),
            }
        ]
    },
    {
        path: '/login',
        component: () => import('../views/pages/auth/Login.vue')
    },
    {
        path: '/logout',
        component:  () => import('../views/pages/auth/Logout.vue')
    },
    
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default router