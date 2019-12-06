<template>
    <md-card class="card">
        <md-card-header>
            <md-card-header-text>
                <div class="md-title">{{name}}</div>
            </md-card-header-text>
        </md-card-header>
        <md-card-content>
            <div>
                <md-icon class="md-accent">phone</md-icon>
                <span class="field">{{contact.phone}}</span>
            </div>
            <div>
                <md-icon class="md-accent">email</md-icon>
                <span class="field">{{contact.email}}</span>
            </div>
        </md-card-content>
        <md-card-actions>
            <md-button @click="edit" class="md-accent contact-card__button_edit">Edit</md-button>
        </md-card-actions>
        <md-card-actions>
            <md-button @click="remove" class="md-accent contact-card__button_remove">Delete</md-button>
        </md-card-actions>
    </md-card>
</template>

<script>
    export default {
        name: "ContactCard",
        computed: {
            name() {
                return this.contact.name ? this.contact.name : this.contact.phone;
            },
        },
        props: {
            contact: {
                required: true,
            },
        },
        methods: {
            edit() {
                this.$emit('edit', this.contact.id);
            },
            remove() {
                this.$emit('remove', this.contact.id);
            },
        },
    }
</script>

<style scoped>
    .card {
        width: 250px;
    }

    .field {
        margin-left: 15px;
    }
</style>
