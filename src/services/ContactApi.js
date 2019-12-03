export class ContactApi {
    http;
    observer;

    /**
     *
     * @param http
     * @param {SubPubService} observer
     */
    constructor(http, observer) {
        this.http = http;
        this.observer = observer;
    }

    list() {
        this.observer.pub('update-start');
        return this.http.get()
            .then(response => {
                let list = Object.values(response.data).filter(item => item);
                this.observer.pub('update', list);
                return list;
            });
    }

    get(id) {
        return this.http.get(id)
            .then(response => response.data);
    }

    create(contact) {
        return this.http.post('', {data: contact});
    }

    update(contact) {
        return this.http.put('', {data: contact});
    }

    delete(id) {
        return this.http.delete(id);
    }
}
