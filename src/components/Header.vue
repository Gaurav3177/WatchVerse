<template>
<v-app-bar class="bg-black custom-font1">
  <div class="d-flex align-center" style="flex-grow: 2;">
    <v-app-title class="text-white text-h5 mr-4" style="cursor: pointer;">
      WatchVerse
    </v-app-title>

    <v-text-field class="search" label="Search Here" hide-details  ></v-text-field>
  </div>

  <v-spacer></v-spacer>

  <v-list class="d-flex bg-black align-center">
  <v-list-item class="items ">Movies</v-list-item>
  <v-list-item class="items">Tv Shows</v-list-item>
  <v-list-item class="items">Watchlist</v-list-item>
  <v-list-item class="items">Your Favourites</v-list-item>
  <v-list-item class="items">
    <v-img :src="profile" max-width="40" max-height="40" class="rounded"></v-img>
  </v-list-item>
</v-list>

</v-app-bar>

</template>


<script>
import profile from '../assets/images/pro.jpg'

export default{
    data(){
        return{
            profile,


        }
    }
}
</script>


<style scoped>

.search{
    max-width: 30rem;
   
    border-bottom: none !important;
    
}
.items{
    cursor: pointer;
}
</style>