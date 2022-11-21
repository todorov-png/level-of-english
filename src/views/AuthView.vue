<template>
    <div class="auth-wrap">
        <div class="auth">
            <h2>{{ auth ? 'Authorization' : 'Registration' }}</h2>
            <auth-component v-if="auth" @change-auth="this.auth = false" />
            <registration-component v-else @change-auth="this.auth = true"/>
        </div>
    </div>
</template>

<script>
import AuthComponent from '@/components/AuthComponent.vue';
import RegistrationComponent from '@/components/RegistrationComponent.vue';
import { mapActions } from 'vuex';

export default {
    name: 'AuthView',
    components: {
        AuthComponent,
        RegistrationComponent
    },
    data() {
        return {
            auth: true,
        };
    },
    async created() {
        if (await this.checkAuth()) this.$router.push({ name: 'home' });
    },
    methods: {
        ...mapActions(['checkAuth']),
    },
};
</script>

<style lang="scss" scoped>
.auth {
    min-width: 270px;
    margin: 20px 30px;
    border-radius: 20px;
    text-align: center;
    background-color: #DDC5A2;
    overflow: hidden;
    &-wrap {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    & > h2 {
        font-size: 30px;
        line-height: 130%;
        margin: 0;
        padding: 5px;
        background-color: #785A46;
        color: white;
    }
}
</style>
