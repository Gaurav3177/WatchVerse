<template>
<v-app-bar class="bg-black custom-font1">
  <div class="d-flex align-center" style="flex-grow: 2;">
    <v-app-title class="text-white text-h5 mr-4" style="cursor: pointer;" @click="this.$router.push('/')">
      WatchVerse
    </v-app-title>

    <v-text-field class="search" label="Search Here" hide-details  ></v-text-field>
  </div>

  <v-spacer></v-spacer>

  <v-list class="d-flex bg-black align-center">
    <v-list-item class="items " to="signup" v-if="auth.accessToken==null">Signup</v-list-item>
     
      
  <v-list-item class="items ">Movies</v-list-item>
  <v-list-item class="items">Tv Shows</v-list-item>
  <v-list-item class="items" to="/watch">Watchlist</v-list-item>
  <v-list-item class="items">Your Favourites</v-list-item>
  <v-list-item class="items" @click="auth.logout(this.$router)" v-if="auth.accessToken!=null"> Logout</v-list-item>
  <v-list-item class="items">
    <v-img :src="profile" max-width="40"  max-height="40" class="rounded"></v-img>
  </v-list-item>
</v-list>

</v-app-bar>

</template>


<script>
import profile from '../assets/images/pro.jpg'
import { authStore } from '../stores/authStore';
export default{
    data(){
        return{
            profile,
            auth : authStore()


        }
    },
    methods:{
      
     
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