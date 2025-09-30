<template>
    <v-app>
        <div class="flex-container">
            <v-card class="pa-5 card-container">
                <div class="text-center mb-5">
                    <h1 class="title">Log In</h1>
                </div>

                <v-text-field v-model="username" label="Username" prepend-icon="mdi-account" outlined dense
                    color="primary"></v-text-field>
                <v-text-field v-model="password" label="Password" type="password" prepend-icon="mdi-lock" outlined dense
                    color="primary"></v-text-field>

                <v-checkbox label="Remember Me" color="primary" class="mb-4"></v-checkbox>

                <v-btn color="primary" block @click="onLogin">Log In</v-btn>

                <div class="mt-3 text-center">
                    <v-btn text variant="text">New to the site? Sign Up</v-btn>
                </div>
            </v-card>
        </div>
    </v-app>
</template>

<script>
import axios from 'axios';
import { authStore } from '../stores/authStore';



export default {
    data() {
        return {
            username: '',
            password: '',

            rememberMe: false,
        };
    },
    methods: {
   
        onLogin() {
            const auth=authStore()

            const email = '';

            axios
                .post('https://dummyjson.com/auth/login', {
                    email,
                    username: this.username,
                    password: this.password
                })
                .then((response) => {
                    console.log(response.data);


                    let { accessToken, refreshToken, ...userdata } = response.data;
                    auth.setUserData(accessToken, refreshToken, userdata);

                    console.log('Login Successful');
                    this.$router.push('/')


                    this.loggedin = true;
                    this.user = userdata;


                })
                .catch((error) => {
                    console.error('Error during login:', error);

                });
        }

    },
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

.card-container {
    background-color: black;
    color: white;
    width: 100%;
    max-width: 500px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

.v-text-field .v-input__control {
    background: none;
}

.v-text-field .v-input__append-inner {
    background: none;
}

.flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: black;
}
</style>
