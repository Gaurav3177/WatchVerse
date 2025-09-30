import { createRouter,createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Details from "../views/Details.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import WatchList from "../views/WatchList.vue";

const routes=[
    {
        path:"/",
        name:"home",
        component:Home,
        

    },
    {
       path: "/details/:type/:id",
        name:"details",
        component:Details,

    },
     {
       path: "/signup",
        name:"signup",
        component:Signup



    },
    {
       path: "/login",
        name:"login",
        component:Login



    }
    ,
       {
       path: "/watch",
        name:"watch",
        component:WatchList



    }
]

const router=createRouter({
    history:createWebHistory(),
    routes
})
export default router