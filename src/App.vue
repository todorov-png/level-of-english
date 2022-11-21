<template>
    <header-component v-if="getUserToken" />
    <div class="main-container container">
        <router-view @pop-up="dataPopUp = $event" />
    </div>
    <footer-component />
    <fade-transition>
        <pop-up-component
            v-if="Object.keys(dataPopUp).length !== 0"
            :data="dataPopUp"
            @click="closePopUp($event)"
            @pop-up="dataPopUp = $event"
        />
    </fade-transition>
</template>
<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import PopUpComponent from '@/components/PopUpComponent.vue';
import FadeTransition from '@/components/inc/FadeTransition.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'App',
    components: {
        HeaderComponent,
        FooterComponent,
        PopUpComponent,
        FadeTransition,
    },
    data() {
        return {
            dataPopUp: {},
        };
    },
    created() {
        document.body.scrollTop = 0;
        window.addEventListener('resize', this.onResize, true);
        window.addEventListener('touchmove', this.onResize, true);
        this.onResize();
    },
    unmounted() {
        window.removeEventListener('resize', this.onResize, true);
        window.removeEventListener('touchmove', this.onResize, true);
    },
    computed: mapGetters(['getUserToken']),
    methods: {
        onResize() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        },
        closePopUp(event) {
            if (event.target.closest('.popup-content') === null) {
                document.body.classList.remove('no-scroll-ios');
                this.dataPopUp = {};
            }
        },
    },
};
</script>
<style lang="scss">
html {
    height: 100%;
}
body {
    height: 100%;
    margin: 0;
    background-image: radial-gradient( #DDC5A2, #301B28);
    &.no-scroll-ios {
        height: 100%;
        width: 100%;
        position: fixed;
        overflow: hidden;
    }
}
* {
    box-sizing: border-box;
}
#app {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
}
.main-container {
    flex: 1 0 auto;
}
.container {
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
}
.content {
    height: 100%;
    padding: 20px;
    background-color: #f4ebdb;
}
.scroll {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar:horizontal {
        height: 4px;
    }
    &::-webkit-scrollbar-thumb {
        background: rgba(black, 0.4);
        border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: black;
    }
}
</style>
