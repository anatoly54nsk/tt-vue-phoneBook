import mockAxios from 'jest-mock-axios';
import {ContactApi} from "../../src/services/ContactApi";
import {SubPubService} from "../../src/services/SubPubService";

describe('ContactApi', () => {
    afterEach(() => {
        mockAxios.reset();
    });

    let svc;
    let obs;

    beforeEach(() => {
        svc = new ContactApi(mockAxios, obs = new SubPubService());
    });

    it('should retrive list', () => {
        let obsCalls = {};
        obs.sub('update-start', () => {
            obsCalls['update-start'] = Date.now()
        });
        obs.sub('update', () => {
            obsCalls['update'] = Date.now()
        });
        const fn = jest.fn();
        const rej = jest.fn();
        svc.list().then(fn, rej);
        let list = [
            {id: '1', name: '3', phone: '123', email: 'assa@saa.lss'},
            {id: '2', name: '4', phone: '345', email: 'assa@saa.lss'},
        ];
        mockAxios.mockResponse({data: list});
        expect(fn).toHaveBeenCalled();
        expect(rej).not.toHaveBeenCalled();

        expect(obsCalls['update-start']).not.toBeUndefined();
        expect(obsCalls['update']).not.toBeUndefined();
        expect(obsCalls['update']).toBeGreaterThan(obsCalls['update-start']);

        expect(fn.mock.calls[0][0]).toEqual(list)
    });

    it('should receive existing item', () => {
        const fn = jest.fn();
        const rej = jest.fn();

        svc.get('1').then(fn, rej);

        let item = {id: '1', name: '3', phone: '123', email: 'assa@saa.lss'};
        mockAxios.mockResponse({data: item});

        expect(fn).toHaveBeenCalled();
        expect(rej).not.toHaveBeenCalled();
        expect(fn.mock.calls[0][0]).toEqual(item)
    });

    it('should not receive item', () => {
        const fn = jest.fn();
        const rej = jest.fn();

        svc.get('3').then(fn, rej);

        let item = {id: '1', name: '3', phone: '123', email: 'assa@saa.lss'};
        mockAxios.mockError(new Error('Not Found'));

        expect(rej).toHaveBeenCalled();
        expect(fn).not.toHaveBeenCalled();
    });

    it('should call post with params', () => {
        const fn = jest.fn();
        const rej = jest.fn();

        let item = {id: '1', name: '3', phone: '123', email: 'assa@saa.lss'};

        svc.create(item).then(fn, rej);
        mockAxios.mockResponse({data: null});
        expect(mockAxios.post).toHaveBeenCalledWith('', {data: item});

        expect(fn).toHaveBeenCalled();
        expect(rej).not.toHaveBeenCalled();
    });

    it('should call put with params', () => {
        const fn = jest.fn();
        const rej = jest.fn();

        let item = {id: '1', name: '3', phone: '123', email: 'assa@saa.lss'};

        svc.update(item).then(fn, rej);
        mockAxios.mockResponse({data: null});
        expect(mockAxios.put).toHaveBeenCalledWith('', {data: item});

        expect(fn).toHaveBeenCalled();
        expect(rej).not.toHaveBeenCalled();
    });

    it('should call delete with params', () => {
        const fn = jest.fn();
        const rej = jest.fn();

        let id = 2;

        svc.delete(id).then(fn, rej);
        mockAxios.mockResponse({data: null});
        expect(mockAxios.delete).toHaveBeenCalledWith(id);

        expect(fn).toHaveBeenCalled();
        expect(rej).not.toHaveBeenCalled();
    });
});
