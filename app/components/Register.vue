

<template>
    <Page class="bg-gradient">
        <ActionBar class="action-bar" title="Create Account" flat="true">
            <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="goToLogin" />
        </ActionBar>

        <ScrollView>
            <StackLayout class="form-container">
                <!-- Header Section -->
                <Label text="Welcome!" class="header-title" />
                <Label text="Create your account to get started" class="header-subtitle" />

                <!-- Form Section -->
                <GridLayout class="input-field" rows="auto" columns="50 *">
                    <Label col="0" class="fas" text="👨‍💻" /> <!-- User icon -->
                    <TextField col="1"
                        v-model="username"
                        hint="Username"
                        class="input"
                        autocorrect="false"
                        autocapitalizationType="none" />
                </GridLayout>

                <GridLayout class="input-field" rows="auto" columns="50 *">
                    <Label col="0" class="fas" text="📧" /> <!-- Email icon -->
                    <TextField col="1"
                        v-model="email"
                        hint="Email address"
                        keyboardType="email"
                        class="input"
                        autocorrect="false"
                        autocapitalizationType="none" />
                </GridLayout>

                <GridLayout class="input-field" rows="auto" columns="50 * 50">
                    <Label col="0" class="fas" text="🔒" /> <!-- Lock icon -->
                    <TextField col="1"
                        v-model="password"
                        :secure="!showPassword"
                        hint="Password"
                        class="input" />

                </GridLayout>

                <!-- Action Buttons -->
                <Button text="CREATE ACCOUNT"
                    @tap="register"
                    class="btn-primary" />

                <GridLayout rows="auto" columns="* auto *" class="divider">
                    <StackLayout col="0" class="hr"></StackLayout>
                    <Label col="1" text="or" class="text-center divider-text" />
                    <StackLayout col="2" class="hr"></StackLayout>
                </GridLayout>

                <Button text="Sign in to existing account"
                    @tap="goToLogin"
                    class="btn-outline" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
import api from '../services/api';

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            showPassword: false
        }
    },
    methods: {
        async register() {
            try {
                await api.register({
                    username: this.username,
                    email: this.email,
                    password: this.password
                });
                alert('Registration successful!');
                this.goToLogin();
            } catch (error) {
                alert('Registration failed. Please try again.');
            }
        },
        goToLogin() {
            this.$navigateTo(require('./Login').default);
        }
    }
}
</script>

<style scoped>
.bg-gradient {
    background: linear-gradient(to bottom, #4a90e2, #357abd);
}

.action-bar {
    background-color: transparent;
    color: white;
}

.form-container {
    padding: 30;
    margin-top: 20;
}

.header-title {
    color: white;
    font-size: 32;
    font-weight: bold;
    margin-bottom: 10;
}

.header-subtitle {
    color: #e6e6e6;
    font-size: 16;
    margin-bottom: 40;
}

.input-field {
    background-color: white;
    border-radius: 8;
    margin-bottom: 15;
    padding: 5 15;
    elevation: 2;
}

.input {
    padding: 10 0;
    font-size: 16;
    placeholder-color: #999;
}

.fas {
    font-size: 18;
    color: #666;
    vertical-align: center;
}

.visibility-icon {
    padding: 10;
}

.btn-primary {
    background-color: #357abd;
    color: white;
    font-weight: bold;
    border-radius: 8;
    height: 50;
    margin: 20 0;
}

.btn-outline {
    background-color: transparent;
    color: white;
    border-width: 1;
    border-color: white;
    border-radius: 8;
    height: 50;
}

.divider {
    margin: 20 0;
}

.hr {
    background-color: #e6e6e6;
    height: 1;
    margin: 10 0;
}

.divider-text {
    color: #e6e6e6;
    padding: 0 10;
}
</style>
