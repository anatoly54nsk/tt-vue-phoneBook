<template>
    <div class="page">
        <Search @search="filterList"></Search>
        <ContactList v-if="!updating" :list="filteredContactList" @edit="edit" @remove="remove"></ContactList>
        <div class="spinner">
            <md-progress-spinner v-if="updating" md-mode="indeterminate"  class="md-accent"></md-progress-spinner>
        </div>
    </div>
</template>

<script>
    import ContactsApi from "../services/ContactsApi";
    import ContactList from "./ContactList";
    import Search from "./Search";

    export default {
        name: "MainPage",
        components: {
            ContactList,
            Search,
        },
        data() {
            return {
                contactList: {},
                filteredContactList: {},
                updating: false,
            }
        },
        methods: {
            update() {
                this.updating = true;
                ContactsApi.getContacts()
                    .then(list => {
                        this.updating = false;
                        this.contactList = list;
                        this.filterList();
                    });
            },
            filterList(query = null) {
                this.filteredContactList = query ?
                    this.contactList.filter(contact => Object.values(contact).join('').toLowerCase().includes(query.toLowerCase()))
                    : this.contactList;
            },
            edit(id) {
                window.console.log(id);
                this.$router.push(`/edit/${id}`);
            },
            remove(id) {
                ContactsApi.deleteContact(id).then(
                    () => this.update()
                );
            },
        },
        created() {
            this.$eventHub.$on('refresh', this.update);
            this.update();
        },
        beforeDestroy() {
            this.$eventHub.$off('refresh');
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
