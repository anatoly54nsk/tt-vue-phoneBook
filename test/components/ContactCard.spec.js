import ContactCard from "../../src/components/ContactCard";
import {createLocalVue, mount} from "@vue/test-utils";
import {MdButton, MdCard, MdIcon} from "vue-material/dist/components";
import Vuetify from 'vuetify';
import Vue from 'vue';

Vue.use(Vuetify);

describe('ContactCard', () => {

    let wrapper;
    let localVue;
    let vuetify;
    let validContact;
    let invalidContact;

    beforeEach(() => {
        vuetify = new Vuetify();
        localVue = createLocalVue();
        localVue.use(MdButton);
        localVue.use(MdCard);
        localVue.use(MdIcon);
        validContact = {
            id: 1,
            name: 'exampleName',
            phone: '+78923334444',
            email: 'example@example.exmpl'
        };
        invalidContact = {
            id: null,
            name: null,
            phone: '+73334444',
            email: 'exxample.exmpl'
        };
    });

    it('should render correctly', () => {
        wrapper = mount(ContactCard, {vuetify, localVue, propsData: {contact: validContact}});
        expect(wrapper.vm.$el).toMatchSnapshot();
    });

    it('should show name when contact.name exists', () => {
        wrapper = mount(ContactCard, {localVue, propsData: {contact: validContact}});
        expect(wrapper.vm.name).toBe(validContact.name);
    });

    it('should show phone when contact.name don`t exists', () => {
        wrapper = mount(ContactCard, {localVue, propsData: {contact: invalidContact}});
        expect(wrapper.vm.name).toBe(invalidContact.phone);
    });

    it('should called computed name function', () => {
        const fn = jest.fn();
        wrapper = mount(ContactCard, {localVue, computed: {name: fn}, propsData: {contact: validContact}});

        expect(fn).toBeCalledTimes(1);
    });

    it('should called only edit method on edit button click', () => {
        const editBtn = jest.fn();
        const removeBtn = jest.fn();
        wrapper = mount(ContactCard, {
            localVue,
            methods: {edit: editBtn, remove: removeBtn},
            propsData: {contact: validContact}
        });
        wrapper.find('button.contact-card__button_edit').trigger('click');

        expect(editBtn).toBeCalledTimes(1);
        expect(removeBtn).not.toBeCalled();
    });

    it('should called only remove method on remove button click', () => {
        const editBtn = jest.fn();
        const removeBtn = jest.fn();
        wrapper = mount(ContactCard, {
            localVue,
            methods: {edit: editBtn, remove: removeBtn},
            propsData: {contact: validContact}
        });
        wrapper.find('button.contact-card__button_remove').trigger('click');

        expect(removeBtn).toBeCalledTimes(1);
        expect(editBtn).not.toBeCalled();
    });

    it('should emit only edit event on edit button click', () => {
        wrapper = mount(ContactCard, {
            localVue,
            propsData: {contact: validContact}
        });
        wrapper.find('button.contact-card__button_edit').trigger('click');

        expect(wrapper.emitted('edit')).toBeTruthy();
        expect(wrapper.emitted('remove')).toBeFalsy();
    });

    it('should emit only remove event on remove button click', () => {
        wrapper = mount(ContactCard, {
            localVue,
            propsData: {contact: validContact}
        });
        wrapper.find('button.contact-card__button_remove').trigger('click');

        expect(wrapper.emitted('remove')).toBeTruthy();
        expect(wrapper.emitted('edit')).toBeFalsy();
    });
});
