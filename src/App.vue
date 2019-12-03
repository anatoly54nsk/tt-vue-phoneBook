<template>
    <div id="app">
        <Header :title="'Phone|kooB'" @home="home" @add="add" @refresh="refresh"></Header>
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>

<script>

    import Header from "./components/Header";

    export default {
        name: 'app',
        components: {Header},
        methods: {
            home() {
                if (this.$router.currentRoute.path !== '/') this.$router.push('/');
            },
            add() {
                if (!this.$router.currentRoute.path.includes('/add')) this.$router.push('/add');
            },
            refresh() {
                this.$eventHub.$emit('refresh');
            },
        },
    }
</script>

<style>
    .page {
        width: 1100px;
        margin: 0 auto;
    }
</style>
