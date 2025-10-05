import { createRouter,createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Details from "../views/Details.vue";
import Signup from "../views/Signup.vue";

import WatchList from "../views/WatchList.vue";
import { authStore } from "../stores/authStore";
import Movie from "../views/Movie.vue";

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
       path: "/watch",
        name:"watch",
        component:WatchList



    },
     {
       path: "/movie",
        name:"movie",
        component:Movie



    },

  

    
]

const router=createRouter({
    history:createWebHistory(),
    routes
})

router.beforeEach((to,from,next)=>{
    const store=authStore()
    const flag=store.accessToken!=null

    if(!flag && to.name!="signup"){
       return next({name:"signup"})
    }

    else if(flag && to.name=="signup"){
        next({name:"home"})
    }

    next()

    
})


export default router