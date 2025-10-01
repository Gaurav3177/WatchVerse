import { defineStore } from "pinia";
import axios from "axios";

export const authStore=defineStore('auth',{
    state:()=>{
        return{
            user:null,
            accessToken:null,
            refreshToken:null,
            watchlist1:[{id:1, movies:[]}],
            watchlistFinal:{},
            apikey: "92fa563a885cfe2c24ec14f2ac6254dd"


        }
    },

    actions:{
        setUserData(token,refreshToken,user){
            this.accessToken=token
            this.refreshToken=refreshToken
            this.user=user

        },

        setWatch1(id){
            this.watchlistFinal[id]={movies:[]}

        },


        setWatch(id,type){
            axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${this.apikey}`)
            .then(({data})=>{
                if(!this.watchlistFinal[this.user.id]){
                    this.setWatch1(this.user.id)
                }
                this.watchlistFinal[this.user.id].movies.push(data)
                console.log(this.watchlistFinal)
            })
            
        }

        // setWatch(id,type){
        //      axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${this.apikey}`)
        //         .then(({ data }) => {



        //             (this.watchlist1[this.user.id].movies || []).push(data)
        //             console.log("SET Watch",data)


                 



        //         })
        //     },

        ,
            getWatch(){
                return this.watchlistFinal

            },

        logout(router){
            this.user=null
            this.accessToken=null
            this.refreshToken=null
       
            router.push("/signup")
            console.log("log out")
        },

        details(){
            console.log(this.user.id)
            console.log(this.watchlist1)
     

        },

 

    },
    persist:true
})