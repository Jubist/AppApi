
// Login.vue
<template>
    <Page>
        <ActionBar title="Login" class="action-bar" flat="true" />
        <GridLayout class="page-container">
            <StackLayout class="login-container">
                <!-- Logo ou Titre -->
                <Label text="Welcome Back" class="title" />
                <Label text="Sign in to continue" class="subtitle" />

                <!-- Formulaire -->
                <StackLayout class="form-container">
                    <!-- Email Input -->
                    <GridLayout rows="auto" columns="auto, *" class="input-field">
                        <Label text="📧" col="0" class="input-icon" />
                        <TextField
                            v-model="email"
                            hint="Email"
                            keyboardType="email"
                            class="input"
                            col="1"
                            autocorrect="false"
                            autocapitalizationType="none"
                        />
                    </GridLayout>

                    <!-- Password Input -->
                    <GridLayout rows="auto" columns="auto, *" class="input-field">
                        <Label text="🔒" col="0" class="input-icon" />
                        <TextField
                            v-model="password"
                            hint="Password"
                            secure="true"
                            class="input"
                            col="1"
                        />
                    </GridLayout>

                    <!-- Boutons -->
                    <Button text="LOGIN" @tap="login" class="login-button" />

                    <!-- OU separator -->
                    <GridLayout columns="*, auto, *" class="separator">
                        <StackLayout col="0" class="line" />
                        <Label text="OR" col="1" class="separator-text" />
                        <StackLayout col="2" class="line" />
                    </GridLayout>

                    <Button text="CREATE ACCOUNT" @tap="goToRegister" class="register-button" />
                </StackLayout>
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script>
import api from '../services/api';
import { ApplicationSettings } from '@nativescript/core';

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async login() {
            try {
                const response = await api.login({
                    email: this.email,
                    password: this.password
                });
                ApplicationSettings.setString('token', response.token);
                this.$navigateTo(require('./Tasks').default, {
                    clearHistory: true
                });
            } catch (error) {
                alert('Login failed. Please check your credentials.');
            }
        },
        goToRegister() {
            this.$navigateTo(require('./Register').default);
        }
    }
}
</script>

<style scoped>
.action-bar {
    background-color: transparent;
    color: #000000;
}

.page-container {
    background-color: #ffffff;
}

.login-container {
    padding: 30;
    width: 90%;
}

.title {
    font-size: 28;
    font-weight: bold;
    color: #1a1a1a;
    margin-bottom: 8;
    margin-top: 40;
}

.subtitle {
    font-size: 16;
    color: #666666;
    margin-bottom: 40;
}

.form-container {
    margin-top: 20;
}

.input-field {
    margin-bottom: 20;
    background-color: #f5f5f5;
    border-radius: 8;
    padding: 4 15;
    height: 50;
}

.input-icon {
    font-size: 18;
    vertical-align: center;
    margin-right: 10;
}

.input {
    font-size: 16;
    placeholder-color: #999999;
    border-width: 0;
    padding: 0;
    background-color: transparent;
}

.login-button {
    height: 50;
    margin-top: 20;
    margin-bottom: 20;
    border-radius: 25;
    background-color: #007AFF;
    color: #ffffff;
    font-weight: bold;
    font-size: 16;
}

.login-button:active {
    background-color: #0056b3;
}

.separator {
    margin: 20 0;
}

.line {
    background-color: #e0e0e0;
    height: 1;
    vertical-align: center;
}

.separator-text {
    color: #666666;
    font-size: 14;
    font-weight: bold;
    padding: 0 10;
}

.register-button {
    height: 50;
    border-radius: 25;
    background-color: transparent;
    border-width: 1;
    border-color: #007AFF;
    color: #007AFF;
    font-weight: bold;
    font-size: 16;
}

.register-button:active {
    background-color: rgba(0, 122, 255, 0.1);
}
</style>
