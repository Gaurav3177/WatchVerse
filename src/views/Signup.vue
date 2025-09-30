<template>
    <v-app>
        <div class="flex-container">
            <v-card class="pa-5 card-container">
                <v-form @submit="submitForm">
                    <div class="text-center mb-5">
                        <h1 class="title">{{ isSignUp ? 'Sign Up' : 'Log In' }}</h1>
                    </div>

                    <div v-if="isSignUp" class="input-container d-flex">



                        <v-text-field label="First Name" v-model="firstName" prepend-icon="mdi-account" outlined dense
                            color="primary"></v-text-field>
                        <v-text-field label="Last Name" v-model="lastName" prepend-icon="mdi-account" outlined dense
                            color="primary"></v-text-field>
                    </div>

                    <v-text-field label="Email" v-model="email" prepend-icon="mdi-email" outlined dense
                        color="primary"></v-text-field>

                    <v-text-field label="Password" v-model="password" prepend-icon="mdi-lock" type="password" outlined
                        dense color="primary"></v-text-field>

                    <v-text-field v-if="isSignUp" label="Confirm Password" v-model="confirmPassword"
                        prepend-icon="mdi-lock" type="password" outlined dense color="primary"></v-text-field>

                    <v-checkbox v-if="!isSignUp" v-model="rememberMe" label="Remember Me" color="primary"
                        class="mb-4"></v-checkbox>

                    <v-btn color="primary" block @click="submitForm" :disabled="isSubmitDisabled">
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
import { authStore } from '../stores/authStore';
import axios from 'axios';
export default {
    data() {
        return {
            isSignUp: true,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            rememberMe: false,
        };
    },
    computed: {
        isSubmitDisabled() {
            if (this.isSignUp) {
                return !this.firstName || !this.lastName || !this.email || !this.password || this.password !== this.confirmPassword;
            }
            return !this.email || !this.password;
        },
    },
    methods: {
        toggleForm() {
            this.isSignUp = !this.isSignUp;
        },
        submitForm() {
            console.log("submit")
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
