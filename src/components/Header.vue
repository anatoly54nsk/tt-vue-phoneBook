<template>
    <md-toolbar class="md-accent" md-elevation="1">
        <h2 class="md-title" style="flex: 1">{{title}}</h2>
        <md-button class="md-icon-button md-raised" @click="home">
            <md-icon>home</md-icon>
            <md-tooltip md-direction="top">На главную</md-tooltip>
        </md-button>
        <md-button class="md-icon-button md-raised"
                   @click="add">
            <md-icon>add</md-icon>
            <md-tooltip md-direction="top">Добавить контакт</md-tooltip>
        </md-button>
        <md-button class="md-icon-button md-raised" @click="refresh">
            <md-icon>refresh</md-icon>
            <md-tooltip md-direction="top">Обновить</md-tooltip>
        </md-button>
    </md-toolbar>
</template>

<script>
    export default {
        name: "Header",
        props: {
            title: {
                required: true,
            },
        },
        methods: {
            home() {
                this.$emit('home');
            },
            add() {
                this.$emit('add');
            },
            refresh() {
                this.$eventHub.$emit('refresh');
            },
        },
    }
</script>

<style scoped>

</style>
