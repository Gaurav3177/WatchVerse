<template>
    <h1>Watchlist</h1>

    <v-card>
        <v-card-title></v-card-title>
        <v-card-text></v-card-text>
    </v-card>
</template>
<script>

import { authStore } from '../stores/authStore';
import { mapState ,mapActions} from 'pinia';
export default{
    data(){
        return{
            data:[]
            
          

        }
    },
      computed: {
        ...mapState(authStore, ['user', 'accessToken', 'obj','watchlist12'])  
    },

    mounted(){
        
        this.getdata()

    },

    methods:{
        ...mapActions(authStore,['getwatch','details']),
       

        getdata(){
            const obj=this.watchlist12.find((item)=> item.id==this.user.id)
            console.log(obj.movie)
            this.data=obj.movie
            console.log(this.data)
        

          
            

        },

    

    }

}
</script>