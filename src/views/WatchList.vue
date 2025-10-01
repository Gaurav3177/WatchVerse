<template>
    <v-main>
        <v-container>
     <div >
            <h1 class="custom-font text-h5" style="font-weight: lighter; ">Popular Now</h1>


            <div class="d-flex  rec-container">

                 <Card width="" v-for="item in data" :key="item.id" :title="item.title"
                    :img="baseimage11 + item.poster_path" class="rec" :vote="item.vote_average.toFixed(1)" :id="item.id">
                </Card>

                <v-card>
                    
                </v-card>

            </div>
        </div>


   

    </v-container>

    </v-main>

    
</template>
<script>

import { authStore } from '../stores/authStore';
import { mapState, mapActions } from 'pinia';
import Card from '../Cards/Card.vue';
export default {

    components:{
        Card

    },
    data() {
        return {
            data: [],
            baseimage11: "https://image.tmdb.org/t/p/original",



        }
    },
    computed: {
        ...mapState(authStore, ['user', 'accessToken', 'obj', 'watchlist12'])
    },

    mounted() {

        this.getdata()

    },

    methods: {
        ...mapActions(authStore, ['getWatch', 'details']),


        getdata() {
            // const obj=this.watchlist12.find((item)=> item.id==this.user.id)
            // console.log(obj.movie)
            // this.data=obj.movie
            // console.log(this.data)


            const obj = this.getWatch()[this.user.id]
            console.log(obj)


            this.data=obj.movies
            console.log(this.data)






        },





    }

}
</script>

<style scoped>
.rec-container {
    gap: 25px;
    overflow-x: auto;
}

</style>