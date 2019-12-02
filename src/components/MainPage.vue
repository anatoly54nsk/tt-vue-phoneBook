<template>
    <div class="page">
        <ContactList :list="filteredContactList"></ContactList>
    </div>
</template>

<script>
    import ContactsApi from "../services/ContactsApi";
    import ContactList from "./ContactList";

    export default {
        name: "MainPage",
        components: {
            ContactList
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
                        this.filteredContactList = this.filterList();
                    })
            },
            filterList(query = null) {
                return query ?
                    this.contactList.filter(contact => Object.values(contact).join('').includes(query))
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
