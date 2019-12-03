<template>
    <div id="app">
        <Header :title="'Phone|kooB'"></Header>
        <router-view :key="$route.fullPath"></router-view>
    </div>
</template>

<script>

    import Header from "./components/Header";

    export default {
        name: 'app',
        components: {Header},
    }
</script>

<style>
    .page {
        width: 1100px;
        margin: 0 auto;
    }
</style>
