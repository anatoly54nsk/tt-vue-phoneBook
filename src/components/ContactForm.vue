<template>
    <div>
        <form novalidate class="md-layout md-alignment-center form" @submit.prevent>
            <md-card class="md-layout-item md-size-50 md-small-size-100">
                <md-card-header>
                    <div class="md-title">Contact</div>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-100">
                            <md-field :class="getValidationClass('name')">
                                <label for="name">Имя</label>
                                <md-input name="name" id="name" autocomplete="given-name"
                                          v-model="contact.name" :disabled="sending"/>
                                <span class="md-error"
                                      v-if="!$v.contact.name.required">Поле Имя обязательно для ввода</span>
                                <span class="md-error"
                                      v-else-if="!$v.contact.name.minLength">Длинна поля Имя должна быть не меньше 3</span>
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-100">
                            <md-field :class="getValidationClass('phone')">
                                <label for="phone">Телефон</label>
                                <md-input type="text" id="phone" name="phone" autocomplete="phone"
                                          v-model="contact.phone"
                                          @keyup="checkPhone()"
                                          :disabled="sending"/>
                                <span class="md-error"
                                      v-if="!$v.contact.phone.required">The phone is required</span>
                                <span class="md-error" v-else-if="!$v.contact.phone.pattern">Invalid phone 3</span>
                            </md-field>
                        </div>
                    </div>

                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-100">
                            <md-field :class="getValidationClass('email')">
                                <label for="email">Email</label>
                                <md-input type="email" name="email" id="email" autocomplete="email"
                                          v-model="contact.email"
                                          :disabled="sending"/>
                                <span class="md-error"
                                      v-if="!$v.contact.email.required">The email is required</span>
                                <span class="md-error" v-else-if="!$v.contact.email.email">Invalid email</span>
                            </md-field>
                        </div>
                    </div>
                </md-card-content>

                <md-progress-bar md-mode="indeterminate" v-if="sending"/>

                <md-card-actions v-if="formMode === 'update'">
                    <md-button type="submit" class="md-accent" :disabled="sending" @click="update">Обновить</md-button>
                </md-card-actions>

                <md-card-actions v-if="formMode === 'create'">
                    <md-button type="submit" class="md-accent" :disabled="sending" @click="add">Добавить</md-button>
                </md-card-actions>
            </md-card>
        </form>
    </div>
</template>


<script>
    import {validationMixin} from 'vuelidate'
    import {
        required,
        email,
        minLength,
    } from 'vuelidate/lib/validators'

    const phonePattern = /^(\+{1}\d{1,3})\s?-?\(?(\d{3})\)?\s?-?(\d{3})\s?-?(\d{4})$/;

    export default {
        name: "ContactForm",
        mixins: [validationMixin],
        props: {
            contact: null,
            formMode: null,
            contactSaved: null,
            sending: null,
        },
        validations: {
            contact: {
                name: {
                    required,
                    minLength: minLength(3),
                },
                phone: {
                    required,
                    pattern: value => {
                        const phoneParts = value.match(phonePattern);
                        return phoneParts !== null;
                    },
                },
                email: {
                    required,
                    email,
                },
            },
        },
        methods: {
            getValidationClass(fieldName) {
                const field = this.$v.contact[fieldName];

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            add() {
                if (this.validateForm()) {
                    const contact = {...this.contact};
                    contact.phone = this.preparePhone(contact.phone);
                    this.$v.$reset();
                    this.$emit('add', contact);
                }
            },
            update() {
                if (this.validateForm()) {
                    const contact = {...this.contact};
                    contact.phone = this.preparePhone(contact.phone);
                    this.$v.$reset();
                    this.$emit('update', contact);
                }
            },
            preparePhone(phone) {
                let phoneParts = phone.match(phonePattern);
                phoneParts.shift();
                return `${phoneParts[0]} ${phoneParts[1]} ${phoneParts[2]} ${phoneParts[3]}`;
            },
            validateForm() {
                this.$v.$touch();
                return !this.$v.$invalid;
            },
            checkPhone() {
                if (this.contact.phone) {
                    let lastLetter = this.contact.phone.slice(-1);
                    let matches = lastLetter.match(/^\d?\(?\)?-?\+?\s?$/g);
                    if (!matches) {
                        this.undoPhoneEntering();
                    }
                }
            },
            undoPhoneEntering() {
                this.contact.phone = this.contact.phone.slice(0, -1);
            },
        },
        beforeRouteUpdate() {
            this.destroy();
        },
    }
</script>

<style scoped>
    .form {
        padding: 50px 15px;
    }

    .md-focused label {
        color: #ff5252 !important;
    }

    .md-focused input {
        color: #ff5252 !important;
    }

    .md-focused::after, .md-focused::before, .md-field::before {
        background-color: #ff5252;
    }
</style>
