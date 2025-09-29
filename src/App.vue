<template>
  <v-app>
    <Header></Header>
    <v-main class="bg-black">
      <router-view></router-view>

    </v-main>

  </v-app>

</template>

<script>
import Header from './components/Header.vue';
export default{

  components:{
    Header
  }


}
</script>


<style>

</style>