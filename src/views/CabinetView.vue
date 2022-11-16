<template>
    <div class="content">
        <h2>User account</h2>
        <div class="account">
            <div class="account__item">
                <p>Your name</p>
                <input type="text" name="name" v-model="getUser.name" />
            </div>
            <div class="account__item">
                <p>Your email</p>
                <input type="email" name="email" :value="getUser.email" disabled />
            </div>
            <div class="account__item">
                <button type="button" @click="save">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'CabinetView',
    async created() {
        if (!(await this.checkAuth())) this.$router.push({ name: 'auth' });
    },
    computed: mapGetters(['getUser']),
    methods: {
        ...mapActions(['checkAuth', 'updateUser']),
        async save() {
            try {
                await this.updateUser(this.getUser);
                this.$router.push({ name: 'home' });
            } catch(e) {
                console.log(e.message);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
h2 {
    margin: 0 auto 20px;
    text-align: center;
    font-size: 30px;
    line-height: 130%;
}
.account {
    max-width: 340px;
    margin: 0 auto;
    &__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
        p {
            font-size: 20px;
            margin: 0 20px 0 0;
        }
        input {
            font-size: 16px;
            line-height: 120%;
            padding: 5px;
            border: 1px solid gray;
            outline: none;
            border-radius: 5px;
            min-width: 210px;
        }
        button {
            cursor: pointer;
            font-size: 16px;
            line-height: 120%;
            border: none;
            outline: none;
            margin: 0 auto;
            color: white;
            background: #0d8aee;
            padding: 10px 15px;
            border-radius: 10px;
            &:hover {
                box-shadow: 0 1px 3px rgba(black, 0.2);
            }
        }
    }
}
</style>
