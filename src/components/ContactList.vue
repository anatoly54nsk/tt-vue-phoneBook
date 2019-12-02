<template>
    <div class="contact-list">
        <ContactCard v-for="contact in list"
                     :contact="contact"
                     :key="contact.id"
                     @edit="edit"
                     @remove="remove">
        </ContactCard>
    </div>
</template>

<script>
    import ContactCard from "./ContactCard";

    export default {
        name: "ContactList",
        components: {
            ContactCard
        },
        props: {
            list: {},
        },
        methods: {
            edit(id) {
                this.emit('edit', id);
            },
            remove(id) {
                this.emit('remove', id);
            },
        },
    }
</script>

<style scoped>
.contact-list {
    padding: 15px 0;
    width: 100%;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    justify-items: center;
    grid-row-gap: 15px;
}
</style>
