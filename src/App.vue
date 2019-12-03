<template>
    <div id="app">
        <Header :title="'Phone|kooB'" :currentPage="currentPage" @home="home" @add="add" @refresh="refresh"></Header>
        <router-view></router-view>
    </div>
</template>

<script>

    import Header from "./components/Header";

    export default {
        name: 'app',
        components: {Header},
        data() {
            return {
                currentPage: 'home',
            }
        },
        methods: {
            home() {
                this.$router.push('/');
                this.selectCurrentRoute();
            },
            add() {
                if (!this.$router.currentRoute.path.includes('/add')) this.$router.push('/add');
            },
            refresh() {
                this.$eventHub.$emit('refresh');
            },
            selectCurrentRoute() {
                const path = this.$router.currentRoute.path;
                if (path === '/') {
                    this.currentPage = 'home';
                }
                if (path.includes('/add')) {
                    this.currentPage = 'add';
                }
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
