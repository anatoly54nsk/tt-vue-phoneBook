<template>
    <md-card-content>
        <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-100">
                <md-field>
                    <label for="search">Поиск</label>
                    <md-input id="search" v-model="query" @keyup="search"/>
                </md-field>
            </div>
        </div>
    </md-card-content>
</template>

<script>
    export default {
        name: "Search",
        data() {
            return {
                query: '',
            }
        },
        methods: {
            search() {
                this.$emit('search', this.query);
            },
        },
        created() {
            this.$eventHub.$on('refresh', () => this.query = '');
        }
    }
</script>

<style scoped>
    .md-focused label {
        color: #ff5252 !important;
    }

    .md-focused input {
        color: #ff5252 !important;
    }

    .md-focused::after, .md-focused::before, .md-field::before {
        background-color: #ff5252 !important;
    }
</style>
