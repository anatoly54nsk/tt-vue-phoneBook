<template>
    <div class="page">
        <Search @search="filterList"></Search>
        <ContactList :list="filteredContactList"></ContactList>
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
            }
        },
        methods: {
            update() {
                ContactsApi.getContacts()
                    .then(list => {
                        this.contactList = list;
                        this.filterList();
                    })
            },
            filterList(query = null) {
                this.filteredContactList = query ?
                    this.contactList.filter(contact => Object.values(contact).join('').toLowerCase().includes(query))
                    : this.contactList;
            },
            edit(id) {
                this.emit('edit', id);
            },
            remove(id) {
                this.emit('remove', id);
            },
        },
        created() {
            this.update();
        },
    }
</script>

<style scoped>
</style>
