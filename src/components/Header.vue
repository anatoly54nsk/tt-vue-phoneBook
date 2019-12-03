<template>
    <md-toolbar class="md-accent" md-elevation="1">
        <h2 class="md-title" style="flex: 1">{{title}}</h2>
        <router-link to="/" tag="md-button" class="md-icon-button md-raised">
            <md-icon>home</md-icon>
            <md-tooltip md-direction="top">На главную</md-tooltip>
        </router-link>
        <router-link to="/add" tag="md-button" class="md-icon-button md-raised">
            <md-icon>add</md-icon>
            <md-tooltip md-direction="top">Добавить контакт</md-tooltip>
        </router-link>
        <md-button class="md-icon-button md-raised" @click="refresh">
            <md-icon>refresh</md-icon>
            <md-tooltip md-direction="top">Обновить</md-tooltip>
        </md-button>
    </md-toolbar>
</template>

<script>
    import contactApi from "../services/HerokuApi";

    export default {
        name: "Header",
        props: {
            title: {
                required: true,
            },
        },
        methods: {
            refresh() {
                contactApi.list();
            },
        },
    }
</script>

<style scoped>

</style>
