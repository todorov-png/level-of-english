<template>
    <form @submit.prevent>
        <input type="email" name="email" v-model="email" placeholder="Email" />
        <input type="password" name="password" v-model="password" placeholder="Password" />
        <p v-if="message" class="message-error">{{ message }}</p>
        <div class="btns">
            <button class="btns__transition" @click="$emit('change-auth')">Registration</button>
            <button class="btns__action" @click="auth">Sign In</button>
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
            email: '',
            password: '',
            message: ''
        };
    },
    methods: {
        ...mapActions(['authUser']),
        async auth() {
            if (!this.email && !this.password) {
                this.message = 'Complete the form!';
                return;
            }
            try {
                await this.authUser({
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
        color: navy;
        background-color: transparent;
    }
    &__action {
        background-color: navy;
        border-radius: 10px;
        color: white;
        padding: 10px 15px;
    }
}
</style>
