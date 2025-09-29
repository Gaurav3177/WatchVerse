<template>
    <v-main class="ma-0 pa-0">
        <!-- <h1>Details</h1>
        <p>{{ this.$route.params.id }}</p> -->

        <v-container fluid class=" mt-5 pa-0" style=" width: 100%; height: 100%;">
          <div class="d-flex" style="gap: 20px;">
            <div style="width: 20%;" class="ml-10">

                    <h2 class="custom-font ml-3">{{ details.title || details.name}}</h2>
                    <div class="d-flex ml-2" style="gap: 5px;">
                    
                        <v-icon color="amber">mdi-star</v-icon>
                        {{ details.vote_average }}
                     


                    </div>

                    
         
                    <img :src="baseimage11+details.poster_path" id="title-img" class="mt-4">

            </div>
            <div style="width: 100%;">
                    <iframe  class="iframe-sizing ma-0 pa-0" :src="baseyoutube+key"  id="myiframe"  v-if="key!=''">
                </iframe>

                </div>
        </div>

        <div class=" d-flex ml-15 mt-3 " style="max-width: 90%;  ">

            <div>
            

            <v-btn variant="text" v-for="item in btn" :key="item" > {{ item.name }} </v-btn>

            <hr class="ml-4">

            <div class="mt-2">
                <p class="ml-4">{{ details.overview }}</p></div>
                <hr class="ml-4">
                <div class="d-flex mt-2 ml-4" style="gap: 5px;">
                <p class=" " style="font-weight: bold;">Release-Date</p>
                <p class="">{{ details.first_air_date || details.release_date}}</p>
                </div>

                <hr class="ml-4">

                <p class="ml-4 mt-2">Available on {{ ProviderName }}</p>


                </div>

                <div class="mt-12 ">
                    <v-btn variant="text" color="blue">+ WatchList</v-btn>
                    <v-btn variant="text" color="blue">+ Add to Favourites</v-btn>
                </div>
        </div>

        


        


        
  




        </v-container>
    </v-main>
</template>
 
<script>
import axios from 'axios';
export default{
    data(){
        return{
            baseyoutube :"https://www.youtube.com/embed/",
             apikey: "92fa563a885cfe2c24ec14f2ac6254dd",
             details:{},
              baseimage11: "https://image.tmdb.org/t/p/original",
              key:"",
              btn:[],
              ProviderName:""

        }
    },


    mounted(){
        this.getDetails()
      
        this.getKey()
        this.getprovider(this.$route.params.id,this.$route.params.type)
        

    },
    methods:{

      getDetails() {

        if(this.$route.params.type=="tv"){
            axios.get(`https://api.themoviedb.org/3/tv/${this.$route.params.id}?api_key=${this.apikey}`)
                .then(({ data }) => {
               
                  this.details=data
                  this.btn = data.genres
                  


                })

        }
        else{
              axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=${this.apikey}`)
                .then(({ data }) => {
               
                  this.details=data
                  this.btn = data.genres


                })

        }


          
        },


        getKey(){

            if(this.$route.params.type=="tv"){
                axios.get(`https://api.themoviedb.org/3/tv/${this.$route.params.id}/videos?api_key=${this.apikey}`)
                .then(({data}) => {
                  console.log(data.results[0].key)
                 this.key=data.results[0].key

                })

            }
            else{
                axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/videos?api_key=${this.apikey}`)
                .then(({data}) => {
                  console.log(data.results[0].key)
                 this.key=data.results[0].key

                })
            }

            
        },

        getprovider(id,type) {

            if(type=='tv'){
                axios.get(`https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${this.apikey}`)
                .then(({ data }) => {

                    this.ProviderName = data.results.AD.flatrate[0].provider_name
                    console.log(this.ProviderName)
                });

            }

            else{

                axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${this.apikey}`)
                .then(({ data }) => {

                    this.ProviderName = data.results.AD.flatrate[0].provider_name
                    console.log(this.ProviderName)
                });

            }

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