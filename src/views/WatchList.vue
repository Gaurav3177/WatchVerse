<template>
   <v-app>
    
   <v-main class="bg-black">
               


                <div class="d-flex  rec-container">

                   
                    <v-card class="custom-font mt-4 rec-card pa-3" v-for="item in data" :key="item.id">
                        <v-img :src="baseimage11 + item.poster_path" class="img-style"></v-img>
                        <v-card-text class="mx-0 pa-0 mt-2 custom-font">
                            <div>
                                <v-icon color="amber">mdi-star</v-icon>
                                {{ item.vote_average.toFixed(1)}}


                            </div>

                            <div class="titleClass">
                                {{ item.title || item.name}}
                            </div>

                        </v-card-text>

                        <v-card-text class="">
                            <v-btn variant="text" color="blue-lighten-4" @click="removeitem(item.id)"> -Remove</v-btn>
                        </v-card-text>
                    </v-card>

                </div>
                </v-main>
                </v-app>









</template>
<script>

import { authStore } from '../stores/authStore';
import { mapState, mapActions } from 'pinia';
import Card from '../Cards/Card.vue';
export default {

    components: {
        Card

    },
    data() {
        return {
            data: [],
            baseimage11: "https://image.tmdb.org/t/p/original",



        }
    },
    computed: {
        ...mapState(authStore, ['user', 'accessToken', 'obj', 'watchlist12']),

        data(){
            return this.getWatch()[this.user.id].movies||[]
        }
        
    },

  

    methods: {
        ...mapActions(authStore, ['getWatch', 'details','removeitem']),


    }

}
</script>

<style scoped>
.rec-container {
    gap: 25px;
    overflow-x: auto;
}
.rec-card {
    background-color: #1a1a1a;

    min-width: 13rem;
    height: 25rem;
    cursor: pointer;




    
}

.titleClass {
    white-space: nowrap;
   
}

</style>