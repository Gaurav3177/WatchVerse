<template>
<v-app-bar flat :color="color? 'black' : 'transparent'" :class="{ 'scrolled': scrolled }" >
 


  <div class="d-flex align-center" style="flex-grow: 2; ">
    <v-app-title class="text-red  mr-4 pl-12 " style="cursor: pointer;font-size: 2rem;" @click="this.$router.push('/')">
      WatchVerse
    </v-app-title>

     <div class="d-flex align-center">
    <v-icon 
      @click="showSearch = !showSearch"
      color="white"
      class="mr-2"
      style="cursor: pointer;"
      v-if="auth.accessToken!=null"
    >
      mdi-magnify
    </v-icon>

    <transition name="searcheffect">

    <v-text-field
      v-if="auth.accessToken!=null"
      v-show="showSearch"
      class="search"
      label="Search Here"
      hide-details
      dense
      solo
      flat
      :style="scrolled ? { backgroundColor: '#222', color: 'white' } : {backgroundColor: '#222',border :'solid 3px black',color:'white'}"
    /></transition>
  </div>
  </div>


  <v-list class="d-flex  align-center pr-12 " style="background: transparent; color: white;">
    <v-list-item class="items " to="signup" v-if="auth.accessToken==null">Register</v-list-item>
     
      
  <v-list-item class="items " >Movies</v-list-item>
  <v-list-item class="items">Tv Shows</v-list-item>
  <v-list-item class="items" to="/watch" >Watchlist</v-list-item>
  <v-list-item class="items" >Your Favourites</v-list-item>
  <v-list-item class="items" @click="auth.logout(this.$router)" v-if="auth.accessToken!=null"> Logout</v-list-item>
  <v-list-item class="items">
    <v-img :src="profile" max-width="40"  max-height="40" class="rounded" ></v-img>
  </v-list-item>
</v-list>

</v-app-bar>

</template>


<script>
import profile from '../assets/images/pro.png'
import { authStore } from '../stores/authStore';
export default{
    data(){
        return{
            profile,
            auth : authStore(),
            scrolled:false,
            showSearch: false


        }
    },

    props:{
      color:Boolean

    },

    mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },

    methods:{
      handleScroll() {
      this.scrolled = window.scrollY > 300
    }
      
     
    }
    
}
</script>


<style scoped>

.search{
    max-width: 30rem;
    width: 30rem;

 
    
}
.items{
    cursor: pointer;
}
.header-font{
  color: white !important;
}
.scrolled {
  background-color: black !important;
}
.searcheffect-enter-active,.searcheffect-leave-active{
  transition: all 0.6s ease;

}
.searcheffect-enter-from, .searcheffect-leave-to {
  width: 0;
  opacity: 0;
  padding: 0;
  margin: 0;
}

.searcheffect-enter-to, .searcheffect-leave-from {
  width: 30rem; 
  opacity: 2;
}



</style>