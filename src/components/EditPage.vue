<template>
    <div class="page">
        <ContactForm
                :contact-saved="contactSaved"
                :formMode="formMode"
                :sending="sending"
                :contact="contact"
                @add="add"
                @update="update"></ContactForm>
    </div>
</template>

<script>
    import contactApi from "../services/HerokuApi";
    import ContactForm from "./ContactForm";

    export default {
        name: "EditPage",
        components: {
            ContactForm
        },
        data() {
            return {
                contactSaved: true,
                sending: false,
                formMode: 'create',
                contact: {
                    id: null,
                    name: null,
                    phone: null,
                    email: null,
                },
            }
        },
        methods: {
            add(contact) {
                contactApi.create(contact)
                    .then(() => this.afterSave());
            },
            update(contact) {
                contactApi.update(contact)
                    .then(() => this.afterSave());
            },
            afterSave() {
                this.contactSaved = true;
                this.sending = false;
                this.$eventHub.$emit('refresh');
                this.$router.push('/');
            },
        },
        created() {
            if (this.$router.currentRoute.params.id) {
                contactApi.get(this.$router.currentRoute.params.id)
                    .then(contact => this.contact = contact);
                this.formMode = 'update';
            }
        },
    }
</script>

<style scoped>

</style>
