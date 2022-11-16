<template>
    <footer>
        <div class="container">
            <p>Copyright Natali Miroshnik {{ fullYear }} All rights reserved</p>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterComponent',
    computed: {
        fullYear() {
            const now = new Date();
            return now.getFullYear();
        },
    },
};
</script>

<style scoped lang="scss">
footer {
    background-color: #000080;
    flex: 0 0 auto;
    & > div {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 50px;
    }
    p {
        font-size: 26px;
        color: white;
        text-align: center;
        padding: 10px 20px;
        margin: 0;
    }
}
</style>
