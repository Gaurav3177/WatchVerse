import { createRouter,createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Details from "../views/Details.vue";

const routes=[
    {
        path:"/",
        name:"home",
        component:Home

    },
    {
       path: "/details/:type/:id",
        name:"details",
        component:Details



    }
    
]

const router=createRouter({
    history:createWebHistory(),
    routes
})
export default router