<template>
    <v-main class="ma-0 pa-0">
        <!-- <h1>Details</h1>
        <p>{{ this.$route.params.id }}</p> -->

        <v-container fluid class=" mt-5 pa-0" style=" width: 100%; height: 100%;">
            <div class="d-flex" style="gap: 20px;">
                <div style="width: 20%;" class="ml-10">

                    <h2 class="custom-font ml-3">{{ details.title || details.name }}</h2>
                    <div class="d-flex ml-2" style="gap: 5px;">

                        <v-icon color="amber">mdi-star</v-icon>
                        {{ details.vote_average }}



                    </div>



                    <img :src="baseimage11 + details.poster_path" id="title-img" class="mt-4">

                </div>
                <div style="width: 100%;">
                    <iframe class="iframe-sizing ma-0 pa-0" :src="baseyoutube + key" id="myiframe" v-if="key != ''">
                    </iframe>

                </div>
            </div>

            <div class=" d-flex ml-15 mt-3 " style="max-width: 90%;  ">

                <div>


                    <v-btn variant="text" v-for="item in btn" :key="item"> {{ item.name }} </v-btn>

                    <hr class="ml-4">

                    <div class="mt-2">
                        <p class="ml-4">{{ details.overview }}</p>
                    </div>
                    <hr class="ml-4">
                    <div class="d-flex mt-2 ml-4" style="gap: 5px;">
                        <p class=" " style="font-weight: bold;">Release-Date</p>
                        <p class="">{{ details.first_air_date || details.release_date }}</p>
                    </div>

                    <hr class="ml-4">

                    <p class="ml-4 mt-2">Available on {{ ProviderName }}</p>


                </div>

                <div class="mt-12 ">
                    <v-btn variant="text" color="blue">+ WatchList</v-btn>
                    <v-btn variant="text" color="blue">+ Add to Favourites</v-btn>
                </div>
            </div>



            <div class="mt-10">
                <h1 class="custom-font text-h5" style="font-weight: lighter; ">Similar to This</h1>


                <div class="d-flex rec-container">

                
                        <Card width="" v-for="item in similar" :key="item.id" :title="item.name"
                            :img="baseimage11 + item.poster_path || baseimage11" class="rec" :vote="item.vote_average" @click="$router.push(`/details/${$route.params.type}/${item.id}`)"
                            >
                        </Card>
                   




                </div>
            </div>









        </v-container>
    </v-main>
</template>

<script>
import axios from 'axios';
import Card from '../Cards/Card.vue';
export default {
    data() {
        return {
            baseyoutube: "https://www.youtube.com/embed/",
            apikey: "92fa563a885cfe2c24ec14f2ac6254dd",
            details: {},
            baseimage11: "https://image.tmdb.org/t/p/original",
            key: "",
            btn: [],
            ProviderName: "",
            similar: []

        }
    },

    components: {
        Card
    },
     watch: {
        '$route.params.id': 'loadData',
        '$route.params.type': 'loadData'
    },


    mounted() {
        this.loadData()


    },

    
    methods: {

        loadData() {
            const { id, type } = this.$route.params;
            this.getDetails(id, type);
            this.getKey(id, type);
            this.getprovider(id, type);
            this.getSimilar(id, type);
        },
        getDetails(id, type) {

            axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=${this.apikey}`)
                .then(({ data }) => {

                    this.details = data
                    this.btn = data.genres



                })





        },

       

        getKey(id, type) {


            axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${this.apikey}`)
                .then(({ data }) => {
                    console.log(data.results[0].key)
                    this.key = data.results[0].key

                })



        },

        getprovider(id, type) {

            axios.get(`https://api.themoviedb.org/3/${type}/${id}/watch/providers?api_key=${this.apikey}`)
                .then(({ data }) => {

                    this.ProviderName = "netflix"
                    console.log(this.ProviderName)
                });







        },


        getSimilar(id, type) {
            axios.get(`https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${this.apikey}`)
                .then(({ data }) => {

                    this.similar = data.results
                    console.log(this.similar)
                });

        },

        gotoDetails(id, type) {
            this.$router.push(`/details/${type}/${id}`)
        }



    },

}

</script>
<style scoped>
#title-img {
    width: 13rem;
    height: 24rem;

    border-radius: 1rem;

}

.iframe-sizing {
    height: 100%;
    width: 100%;

    border: none;
    border-radius: 10px;

}
</style>