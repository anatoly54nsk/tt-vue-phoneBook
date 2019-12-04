import {SubPubService} from "../../src/services/SubPubService";

describe('SubPubService', () => {
    let obs;

    beforeEach(() => {
        obs = new SubPubService()
    });

    it('should sub subscriber', () => {
        const fn = jest.fn();
        obs.sub('event', fn);

        obs.pub('event');
        expect(fn).toBeCalled();
    });

    it('should function returned from sub unsubscribe', () => {
        const fn = jest.fn();
        const unSubFn = obs.sub('event', fn);

        unSubFn('event');

        obs.pub('event');
        expect(fn).not.toBeCalled();
    });

    it('should pub call all subscribers', () => {
        const fn = jest.fn();
        const fn2 = jest.fn();
        const fn3 = jest.fn();
        obs.sub('event', fn);
        obs.sub('event', fn2);
        obs.sub('event', fn3);

        obs.pub('event');
        expect(fn).toBeCalledTimes(1);
        expect(fn2).toBeCalledTimes(1);
        expect(fn3).toBeCalledTimes(1);
    });

    it('should off unsubscribe listener', () => {
        const fn = jest.fn();
        obs.sub('event', fn);
        obs.pub('event');

        expect(fn).toBeCalledTimes(1);

        obs.off('event', fn);
        obs.pub('event');

        expect(fn).not.toBeCalledTimes(2);
    });

    it('should off unsubscribe all listeners without second param', () => {
        const fn = jest.fn();
        const fn2 = jest.fn();
        obs.sub('event', fn);
        obs.sub('event', fn2);
        obs.pub('event');

        expect(fn).toBeCalledTimes(1);
        expect(fn2).toBeCalledTimes(1);

        obs.off('event');
        obs.pub('event');

        expect(fn).toBeCalledTimes(1);
        expect(fn2).toBeCalledTimes(1);
    });

    it('should off unsubscribe only listeners passed by the second parameter', () => {
        const fn = jest.fn();
        const fn2 = jest.fn();
        obs.sub('event', fn);
        obs.sub('event', fn2);
        obs.pub('event');

        expect(fn).toBeCalledTimes(1);
        expect(fn2).toBeCalledTimes(1);

        obs.off('event', fn);
        obs.pub('event');

        expect(fn).toBeCalledTimes(1);
        expect(fn2).toBeCalledTimes(2);
    });

    it('should fn called with params', () => {
        const fn = jest.fn();
        obs.sub('event', fn);

        obs.pub('event', 1);

        expect(fn).toBeCalledWith({event: 'event', data: 1})
    });
});
