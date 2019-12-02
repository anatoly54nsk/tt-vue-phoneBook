import axios from 'axios';

const baseURL = 'https://phone-book-decentury.herokuapp.com/api/pb';
const httpClient = axios.create({
    baseURL
});

export default {

    /**
     * @returns {Promise<AxiosResponse<>>}
     */
    getContacts() {
        return httpClient.get('')
            .then(response => Object.values(response.data).filter(item => item));
    },

    /**
     * @param {String} id
     * @returns {Promise<AxiosResponse<>>}
     */
    getContact(id) {
        return httpClient.get(id);
    },

    /**
     * @param {Object} phone
     * @returns {Promise<AxiosResponse<>>}
     */
    createContact(phone) {
        return httpClient.post('', phone);
    },

    /**
     * @param {Object} phone
     * @returns {Promise<AxiosResponse<>>}
     */
    updateContact(phone) {
        return httpClient.put('', phone);
    },

    /**
     * @param {String} id
     * @returns {Promise<AxiosResponse<>>}
     */
    deleteContact(id) {
        return httpClient.delete(id);
    }
}
