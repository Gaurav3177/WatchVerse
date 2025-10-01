<template>
    <v-app>
        <div class="flex-container">
            <v-card class="pa-5 card-container">
                <v-form @submit.prevent="onLogin">
                    <div class="text-center mb-5">
                        <h1 class="title">{{ isSignUp ? 'Sign Up' : 'Log In' }}</h1>
                    </div>

                    <div v-if="isSignUp" class="input-container d-flex">
                        <v-text-field label="First Name" v-model="firstName" prepend-icon="mdi-account" outlined dense
                            color="primary" />
                        <v-text-field label="Last Name" v-model="lastName" prepend-icon="mdi-account" outlined dense
                            color="primary" />
                    </div>

                    <v-text-field label="Username" v-model="username" prepend-icon="mdi-account" outlined dense
                        color="primary" />

                    <v-text-field label="Password" v-model="password" prepend-icon="mdi-lock" type="password" outlined
                        dense color="primary" />

                    <v-text-field v-if="isSignUp" label="Confirm Password" v-model="confirmPassword"
                        prepend-icon="mdi-lock" type="password" outlined dense color="primary" />

                    <v-checkbox v-if="!isSignUp" v-model="rememberMe" label="Remember Me" color="primary"
                        class="mb-4" />

                    <v-btn color="primary" block @click="isSignUp ? onRegister(): onLogin()" :disabled="isSubmitDisabled">
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
    </v-app>
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
            rememberMe: false
        };
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
