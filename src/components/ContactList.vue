<template>
    <div class="content">
        <h1 class="no-variants" v-if="list && list.length===0">Нет похожих контактов</h1>
        <div class="contact-list">
            <ContactCard v-for="contact in list"
                         :contact="contact"
                         :key="contact.id"
                         @edit="edit"
                         @remove="remove">
            </ContactCard>
        </div>
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
            list: Array,
        },
        methods: {
            edit(id) {
                this.$emit('edit', id);
            },
            remove(id) {
                this.$emit('remove', id);
            },
        },
    }
</script>

<style scoped>
    .content {
        width: 100%;
    }

    .contact-list {
        padding: 15px 0;
        width: 100%;
        display: grid;
        grid-template-columns: 25% 25% 25% 25%;
        justify-items: center;
        grid-row-gap: 15px;
    }

    .no-variants {
        display: block;
        text-align: center;
        width: 100%;
        color: #ff5252;
    }
</style>
