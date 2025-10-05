<template>

<div class="flex-container">
  <transition name="slides" mode="out-in">
    <div
      v-if="images[index]"
      :key="images[index].backdrop_path"
      class="slide-container"
      :style="{ backgroundImage: `url(${base + images[index].backdrop_path})` }"
    ></div>
  </transition>
        <v-card class="pa-5 card-container">
            <v-form @submit.prevent="onLogin">
                <div class="text-center mb-5">
                    <h1 class="title">{{ isSignUp ? 'Sign Up' : 'Log In' }}</h1>
                </div>

                <div v-if="isSignUp" class="input-container d-flex">
                    <v-text-field label="First Name" v-model="firstName" prepend-icon="mdi-account" outlined dense />
                    <v-text-field label="Last Name" v-model="lastName" prepend-icon="mdi-account" outlined dense />
                </div>

                <v-text-field label="Username" v-model="username" prepend-icon="mdi-account" outlined dense />

                <v-text-field label="Password" v-model="password" prepend-icon="mdi-lock" type="password" outlined dense
                    color="primary" />

                <v-text-field v-if="isSignUp" label="Confirm Password" v-model="confirmPassword" prepend-icon="mdi-lock"
                    type="password" outlined dense color="primary" />

                <v-checkbox v-if="!isSignUp" v-model="rememberMe" label="Remember Me" color="primary" class="mb-4" />

                <v-btn color="primary" block @click="isSignUp ? onRegister() : onLogin()" :disabled="isSubmitDisabled">
                    {{ isSignUp ? 'Sign Up' : 'Log In' }}
                </v-btn>

                <div class="mt-3 text-center">
                    <v-btn text @click="toggleForm" variant="text">
                        {{ isSignUp ? 'Already have an account? Log In' : 'New to the site? Sign Up' }}
                    </v-btn>
                </div>
            </v-form>
        </v-card>
    </div>

</template>

<script>
import axios from 'axios';
import { authStore } from '../stores/authStore';

export default {
    data() {
        return {
            isSignUp: true,
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            rememberMe: false,
            images:[],
            apikey: "92fa563a885cfe2c24ec14f2ac6254dd",
            base:"https://image.tmdb.org/t/p/original",
            index:0
        };
    },
    mounted(){
        setInterval(()=>{
            if(this.index>7){
                this.index=0
            }
            this.index++;
        },4000)
        this.getimages()

    },
    computed: {
        isSubmitDisabled() {
            if (this.isSignUp) {
                return (
                    !this.firstName ||
                    !this.lastName ||
                    !this.username ||

                    !this.password ||
                    this.password !== this.confirmPassword
                );
            }
            return !this.username || !this.password;
        }
    },
    methods: {
        onLogin() {
            console.log("login call");
            const auth = authStore();

            axios
                .post('https://dummyjson.com/auth/login', {
                    username: this.username,
                    password: this.password
                })
                .then((response) => {
                    const { accessToken, refreshToken, ...userdata } = response.data;

                    const watchlist = auth.getWatch();
                    const flag = userdata.id in watchlist;

                    console.log('Watchlist:', watchlist);
                    console.log('User ID:', userdata.id);
                    console.log('Is Registered:', flag);

                    if (flag) {
                        auth.setUserData(accessToken, refreshToken, userdata);
                        this.$router.push('/');
                    } else {
                        alert("User is not registered! Register");
                        this.toggleForm()
                    }
                })
                .catch((error) => {
                    console.error('Error during login:', error);
                });
        },


        toggleForm() {
            this.isSignUp = !this.isSignUp;
        }
        ,

        onRegister() {
            console.log("register call")
            const auth = authStore();



            axios
                .post('https://dummyjson.com/auth/login', {
                    username: this.username,
                    password: this.password
                })
                .then((response) => {
                    const { accessToken, refreshToken, ...userdata } = response.data;

                    const flag = userdata.id in auth.getWatch()
                    console.log(flag)
                    if (flag) {

                        alert("User is already registered! Login")
                        this.toggleForm()

                    }

                    else {
                        auth.setUserData(accessToken, refreshToken, userdata);

                        auth.setWatch1(userdata.id)
                        console.log(userdata)
                        console.log(auth.getWatch())
                        this.$router.push('/');


                    }






                })
                .catch((error) => {
                    console.error('Error during login:', error);
                });
        },

        getimages() {
            axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${this.apikey}`)
                .then(({ data }) => {
                    this.images = data.results.slice(0, 10);
                    console.log("Slide=", this.images);

                });
        },
    }
};
</script>

<style scoped>
.v-app {
    background-color: black !important;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}




.title {
    font-size: 2rem;
    font-weight: 500;
    color: #fff;
}

.v-btn {
    border-radius: 20px;
    font-size: 1.1rem;
}

.flex-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.slide-container {
  position: absolute;

  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}



.card-container {
  position: relative;

  background: rgba(0,0,0,0.5);
  color: #fff;
  max-width: 500px;
  width: 100%;
  border-radius: 12px;
}
.slides-enter-active, .slides-leave-active {
  transition: all 2s ease-in-out;
  position: absolute;
  width: 100%;
  height: 100%;
}





</style>
