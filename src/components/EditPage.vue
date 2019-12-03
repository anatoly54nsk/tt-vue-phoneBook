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
    import ContactsApi from "../services/ContactsApi";
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
                ContactsApi.createContact({data: contact})
                    .then(
                        () => {
                            this.afterSave();
                        }
                    );
            },
            update(contact) {
                ContactsApi.updateContact({data: contact})
                    .then(
                        () => {
                            this.afterSave();
                        }
                    );
            },
            afterSave() {
                this.contactSaved = true;
                this.sending = false;
                this.$eventHub.$emit('refresh');
                this.$router.push('/');
            },
        },
        created() {
            window.console.log(this.$router.currentRoute.path);
            if (this.$router.currentRoute.path.includes('/edit')) {
                ContactsApi.getContact(this.$router.currentRoute.params.id)
                    .then(contact => this.contact = contact.data);
                this.formMode = 'update';
            }
        },
    }
</script>

<style scoped>

</style>
