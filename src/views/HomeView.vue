<template>
    <div class="content">
        <h2>List of tests</h2>
        <div class="test">
            <div v-for="(test, index) in getAllTestName" :key="index" @click="goToTestPage(test.name)" class="test__item">
                <p class="test__item-index">{{ index+1 }}</p>
                <p class="test__item-name">{{ test.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'HomeView',
    async created() {
        if (!(await this.checkAuth())) this.$router.push({ name: 'auth' });
        await this.fetchTestsName();
    },
    computed: mapGetters(['getAllTestName']),
    methods: {
        ...mapActions(['checkAuth', 'fetchTestsName', 'fetchTest']),
        async goToTestPage(name){
            await this.fetchTest(name);
            this.$router.push({ name: 'test' });
        }
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
.test {
    border: 2px solid black;
    border-radius: 10px;
    overflow: hidden;
    &__item {
        cursor: pointer;
        display: flex;
        align-items: center;
        border-bottom: 2px solid black;
        &:last-of-type {
            border-bottom: none;
        }
        &:hover {
            background-color: darkturquoise;
        }
        p {
            display: flex;
            align-items: center;
            font-size: 20px;
            margin: 0;
        }
        &-index {
            width: 40px;
            justify-content: center;
            flex-shrink: 0;
        }
        &-name {
            min-height: 40px;
            padding: 0 15px;
            border-left: 2px solid black;
        }
        
    }
}
</style>
