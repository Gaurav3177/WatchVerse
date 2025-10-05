<template>
    <v-card class="custom-font mt-4 rec-card pa-3">
        <v-img :src="img" class="img-style"></v-img>
        <v-card-text class="mx-0 pa-0 mt-2 custom-font">
            <div>
                <v-icon color="amber">mdi-star</v-icon>
                {{ vote}}
            

            </div>

            <div>
                {{ title }}
            </div>
            
        </v-card-text>

        <v-card-text class="py-2">
            <v-btn  variant="text" color="blue-lighten-4" @click.stop="setWatch(id,type)">+ WatchList</v-btn>
            <v-btn  variant="text" color="blue-lighten-4" @click.stop="setWatch(id,type)">+ Favourites</v-btn>
        </v-card-text>
    </v-card>
</template>

<script>

import { authStore } from '../stores/authStore';
import { mapActions,mapState } from 'pinia';
export default {
    props: {
        img: String,
        title: String,
        vote:String,
        id:String,
        type:String

    },
    computed:{
        
    },

    methods:{
        ...mapActions(authStore,['setWatch'])
    }
}
</script>

<style scoped>
.rec-card {
    background-color: #1a1a1a;

    min-width: 15rem;
    height: 48vh;
    cursor: pointer;




    
}


</style>