<template>
    <form @submit.prevent>
        <input type="text" name="name" v-model="name" placeholder="Name" />
        <input type="email" name="email" v-model="email" placeholder="Email" />
        <input type="password" name="password" v-model="password" placeholder="Password" />
        <input type="password" name="repeat-password" v-model="repeatPassword" placeholder="Repeat password" />
        <p v-if="message" class="message-error">{{ message }}</p>
        <div class="btns">
            <button class="btns__transition" @click="$emit('change-auth')">Authorization</button>
            <button class="btns__action" @click="register">Register</button>
        </div>
    </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'AuthComponent',
    emits: ['change-auth'],
    data() {
        return {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
            message: '',
        };
    },
    methods: {
        ...mapActions(['createUser']),
        async register() {
            this.message = '';
            if (!this.name && !this.email && !this.password && !this.repeatPassword) {
                this.message = 'Complete the form!';
                return;
            }
            if (this.password !== this.repeatPassword) {
                this.message = 'Passwords do not match!';
                return;
            }
            if (this.password.length < 6) {
                this.message = 'Password must be longer than 6 characters!';
                return;
            }
            try {
                await this.createUser({
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });
                this.$router.push({ name: 'home' });
            } catch (e) {
                if (e && e?.message) {
                    this.message = e.message;
                }
            }
        },
    },
};
</script>

<style scoped lang="scss">
form {
    font-size: 18px;
    line-height: 120%;
    padding: 20px;
    display: flex;
    flex-direction: column;
}
input {
    padding: 10px 15px;
    border: 1px solid gray;
    outline: none;
    border-bottom: none;
    &:first-of-type {
        border-radius: 10px 10px 0 0;
    }
    &:last-of-type {
        border-radius: 0 0 10px 10px;
        border-bottom: 1px solid gray;
    }
}
.message-error {
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 0;
    color: red;
}
.btns {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
        cursor: pointer;
        font-size: 16px;
        line-height: 120%;
        border: none;
    }
    &__transition {
        color: #785A46;
        background-color: transparent;
    }
    &__action {
        background-color: #785A46;
        border-radius: 10px;
        color: white;
        padding: 10px 15px;
    }
}
</style>
