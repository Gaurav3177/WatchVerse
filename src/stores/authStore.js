import { defineStore } from "pinia";
import axios from "axios";

export const authStore=defineStore('auth',{
    state:()=>{
        return{
            user:null,
            accessToken:null,
            refreshToken:null,
            watchlist12:[{id:1,movie:[{movie_id:22,title:"hdsgh",body:"jbsajkcnh"},{movie_id:22,title:"hdsgh",body:"jbsajkcnh"}]}
            ,{id:2,movie:[{movie_id:22,title:"hdsgh",body:"jbsajkcnh"}]}],
            obj:{name:"jdfjb skl",body:"ndlnfk"},
            apikey: "92fa563a885cfe2c24ec14f2ac6254dd",

        }
    },

    actions:{
        setUserData(token,refreshToken,user){
            this.accessToken=token
            this.refreshToken=refreshToken
            this.user=user

        },

        setWatch(id,type){
             axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${this.apikey}`)
                .then(({ data }) => {

                    (this.watchlist12[0].movie || []).push(data)
                    console.log("SET Watch",data)
                 



                })

                





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