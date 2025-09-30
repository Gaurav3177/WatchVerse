import { defineStore } from "pinia";

export const authStore=defineStore('auth',{
    state:()=>{
        return{
            user:null,
            accessToken:null,
            refreshToken:null,
            watchlist12:[{id:1,movie:[{movie_id:22,title:"hdsgh",body:"jbsajkcnh"},{movie_id:22,title:"hdsgh",body:"jbsajkcnh"}
                
            ]},{id:2,movie:[{movie_id:22,title:"hdsgh",body:"jbsajkcnh"}]}],
            obj:{name:"jdfjb skl",body:"ndlnfk"}

        }
    },

    actions:{
        setUserData(token,refreshToken,user){
            this.accessToken=token
            this.refreshToken=refreshToken
            this.user=user

        },

        setWatch(id,type){
            


        },

        logout(router){
            this.user=null
            this.accessToken=null
            this.refreshToken=null
       
            router.push("/login")
            console.log("log out")
        },

        details(){
            console.log(this.user.id)
            console.log(this.watchlist12)
     

        },

        getwatch(){
            return this.watchlist12
        }
 

    },
    persist:true
})