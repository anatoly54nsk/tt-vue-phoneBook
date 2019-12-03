import axios from "axios";
import {ContactApi} from "./ContactApi";
import {SubPubService} from "./SubPubService";

const httpClient = axios.create({
    baseURL: 'https://phone-book-decentury.herokuapp.com/api/pb'
});

export default new ContactApi(httpClient, new SubPubService());
