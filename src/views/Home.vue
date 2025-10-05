<template>



    <div class="slide-main-container">


        <transition name="slides" mode="out-in">

            <div v-if="slide[currSlide]" :key="currSlide" class="slide-container">
                <v-img class="pa-0 ma-0" :src="baseimage11 + slide[currSlide].backdrop_path" cover width="100%"
                    height="100%"></v-img>

                <div class="slide-contain">








                    <h1 class="custom-font2">{{ slide[currSlide].name }}</h1>
                    <h2 class="custom-font2">{{ slide[currSlide].first_air_date }}</h2>
                    <p style=" color: white; font-size: 1.3rem;" class="mt-4 custom-font1">
                        {{ slide[currSlide].overview }}

                    </p>

                    <div class="d-flex mt-3 mx-0" style="gap: 10px;">
                        <v-btn variant="text" color="blue"
                            @click="setWatch(slide[currSlide].id, 'tv')">+WatchList</v-btn>
                        <v-btn variant="text" color="blue" @click="gotoDetails(slide[currSlide].id, 'tv')"> View
                            Details</v-btn>
                    </div>
                </div>


            </div>
        </transition>


    </div>













    <div class="bg-black">
        <div class="mt-5">
            <h1 class="custom-font text-h5" style="font-weight: lighter; ">Recommendations For You</h1>


            <div class="d-flex rec-container">

                <Card width="" v-for="item in recom" :key="item.id" :title="item.title"
                    :img="baseimage + item.poster_path" class="rec" :vote="item.vote_average.toFixed(1)" :id="item.id"
                    type="movie" @click="gotoDetails(item.id, 'movie')">
                </Card>


            </div>
        </div>


        <div class="mt-5">
            <h1 class="custom-font text-h5" style="font-weight: lighter; ">Trending Now</h1>


            <div class="d-flex rec-container">

                <Card width="" v-for="item in pop" :key="item.id" :title="item.name" :img="baseimage + item.poster_path"
                    class="rec" :vote="item.vote_average.toFixed(1)" :id="item.id" type="tv"
                    @click="gotoDetails(item.id, 'tv')">
                </Card>


            </div>
        </div>


        <div class="mt-5">
            <h1 class="custom-font text-h5" style="font-weight: lighter; ">New Releases</h1>


            <div class="d-flex rec-container">

                <Card width="" v-for="item in xyz" :key="item.id" :title="item.name" :img="baseimage + item.poster_path"
                    class="rec" :vote="item.vote_average.toFixed(1)" :id="item.id" type="tv"
                    @click="gotoDetails(item.id, 'tv')">
                </Card>


            </div>
        </div>
    </div>







</template>

<script>
import Card from '../Cards/Card.vue';
import axios from 'axios';
import netflix from '../assets/images/netflix.png'
import { authStore } from '../stores/authStore';
import { mapActions, mapState } from 'pinia';

export default {
    components: {
        Card
    },

    computed: {


    },

    data() {

        return {
            currSlide: 0,
            slide: [],
            recom: [],
            pop: [],
            xyz: [],

            temp: "/bKxiLRPVWe2nZXCzt6JPr5HNWYm.jpg",


            baseimage11: "https://image.tmdb.org/t/p/original",


            baseimage: "https://image.tmdb.org/t/p/w500",
            apikey: "92fa563a885cfe2c24ec14f2ac6254dd",
            ProviderName: "",
            netflix

        }
    },

    mounted() {
        setInterval(() => {
            if (this.currSlide == 17) {
                this.currSlide = 0
            }
            this.currSlide++
        }, 6000)

        this.getrecom()
        this.getpop()
        this.getxyz()
        this.getslide()



    },

    methods: {
        ...mapActions(authStore, ['setWatch']),
        getrecom() {
            this.$api1.get(`/movie?api_key=${this.apikey}&with_original_language=hi&sort_by=popularity.desc`)
                .then(({ data }) => {
                    this.recom = data.results

                    console.log(this.recom[0]
                    )
                })
        },

        getpop() {

            axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=${this.apikey}`)
                .then(({ data }) => {
                    this.pop = data.results
                    console.log(this.pop)


                })
        },
getxyz() {
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apikey}&language=en-US`)
        .then(({ data }) => {
            this.xyz = data.results
            console.log(this.xyz)
        })
}

,

        getslide() {
  axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${this.apikey}&language=en-US`)

        .then(({ data }) => {
            this.slide = data.results.slice(0, 18);
            console.log("Slide=", this.slide);

            if (this.slide.length > 0) {
                this.getprovider(this.slide[this.currSlide].id);
            }
        });
}


        ,

        getprovider(id) {
            axios.get(`https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${this.apikey}`)
                .then(({ data }) => {

                    this.ProviderName = data.results.AD.flatrate[0].provider_name
                    console.log(this.ProviderName)
                });


        },

        gotoDetails(id, type) {
            this.$router.push(`/details/${type}/${id}`)
        }


    }
}
</script>




<style>

.slide-contain h1,
.slide-contain h2,
.slide-contain p {

    text-shadow: 5px 5px 10px rgba(0, 0, 0, 1);
}

.rec-container::-webkit-scrollbar {
    display: none;


}

.rec-container {
    gap: 25px;
    overflow-x: auto;
}

.slide-container {
    position: absolute;
    width: 100%;
    height: 100%;
}

.slide-contain {
    position: absolute;
    max-width: 32%;
    bottom: 11.5rem;
    left: 3rem;
}

.slide-main-container {
    position: relative;
    width: 100%;
    height: 90vh;
}
</style>