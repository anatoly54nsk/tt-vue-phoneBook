<template>
    <div class="page">
        <Search @search="setQuery"></Search>
        <ContactList v-if="!updating" :list="filteredContactList" @edit="edit" @remove="remove"></ContactList>
        <div class="spinner">
            <md-progress-spinner v-if="updating" md-mode="indeterminate" class="md-accent"></md-progress-spinner>
        </div>
    </div>
</template>

<script>
    import ContactList from "./ContactList";
    import Search from "./Search";
    import contactApi from '../services/HerokuApi';

    export default {
        name: "MainPage",
        components: {
            ContactList,
            Search,
        },
        data() {
            return {
                query: '',
                contactList: [],
                filteredContactList: [],
                updating: false,
                subList: [],
            }
        },
        methods: {
            update(list) {
                this.updating = false;
                this.contactList = list;
                this.filterList();
            },
            setQuery(query) {
                this.query = query.toLowerCase();
                this.filterList();
            },
            contactMatchesQuery: function (contact) {
                return Object.values(contact).join(' ').toLowerCase().includes(this.query);
            },
            filterList() {
                this.filteredContactList = this.query ?
                    this.contactList
                        .filter(contact => this.contactMatchesQuery(contact))
                    : this.contactList.slice(0);
            },
            edit(id) {
                this.$router.push(`/edit/${id}`);
            },
            remove(id) {
                contactApi.delete(id).then(
                    () => contactApi.list()
                );
            },
        },
        created() {
            this.subList.push(contactApi.observer.sub('update-start', () => this.updating = true));
            this.subList.push(contactApi.observer.sub('update', ({data}) => {
                this.updating = false;
                this.update(data);
            }));
            contactApi.list();
        },
        beforeDestroy() {
            this.subList.forEach(unSub => unSub());
        },
    }
</script>

<style scoped>
    .spinner {
        display: flex;
        justify-content: center;
        width: 100%;
    }
</style>
