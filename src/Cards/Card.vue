<template>
    <v-card class="custom-font mt-4 rec-card pa-3">
        <v-img :src="img" class="img-style"></v-img>
        <v-card-text class="mx-0 pa-0 mt-2 custom-font">
            <div>
                <v-icon color="amber">mdi-star</v-icon>
                {{ vote}}
            

            </div>

            <div>
                {{ title }}
            </div>
            
        </v-card-text>

        <v-card-text class="py-2">
            <v-btn  variant="text" color="blue-lighten-4">+ WatchList</v-btn>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: {
        img: String,
        title: String,
        vote:String

    }
}
</script>

<style scoped>
.rec-card {
    background-color: #1a1a1a;

    min-width: 13rem;
    height: 25rem;
    cursor: pointer;




    
}


</style>