<template>
  <v-app>
    <Header v-if="$route.name=='details'" :color="true"></Header>
    <Header v-else></Header>

    <v-main v-if="$route.name == 'details'">
      <router-view></router-view>
    </v-main>

      <router-view v-else></router-view>

    

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