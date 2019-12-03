import {SubPubService} from "../../src/services/SubPubService";

describe('SubPubService', () => {
    let obs;
    let fn;

    beforeEach(() => {
        fn = jest.fn();
        obs = new SubPubService()
    });

    it('should sub subscriber', () => {
        obs.sub('event', fn);

        obs.pub('event');
        expect(fn).toBeCalled();
    });

    it('should function returned from sub unsubscribe', () => {
        const unSubFn = obs.sub('event', fn);

        unSubFn('event');

        obs.pub('event');
        expect(fn).not.toBeCalled();
    });

    it('should pub call all subscribers', () => {
        const fn2 = jest.fn();
        const fn3 = jest.fn();
        obs.sub('event', fn);
        obs.sub('event', fn2);
        obs.sub('event', fn3);

        obs.pub('event');
        expect(fn).toBeCalledTimes(1);
        expect(fn2).toBeCalledTimes(1);
        expect(fn3).toBeCalledTimes(1);
        ;
    });

    it('should off unsubscribe listener', () => {
        obs.sub('event', fn);
        obs.pub('event');

        expect(fn).toBeCalledTimes(1);

        obs.off('event', fn);
        obs.pub('event');

        expect(fn).not.toBeCalledTimes(2);
    });

    it('should off unsubscribe all listeners without second param', () => {
        const fn2 = jest.fn();
        obs.sub('event', fn);
        obs.sub('event', fn2);
        obs.pub('event');

        expect(fn).toBeCalledTimes(1);
        expect(fn2).toBeCalledTimes(1);

        obs.off('event');
        obs.pub('event');

        expect(fn).not.toBeCalledTimes(2);
        expect(fn2).not.toBeCalledTimes(2);
    });

    it('should off unsubscribe only listeners passed by the second parameter', () => {
        const fn2 = jest.fn();
        obs.sub('event', fn);
        obs.sub('event', fn2);
        obs.pub('event');

        expect(fn).toBeCalledTimes(1);
        expect(fn2).toBeCalledTimes(1);

        obs.off('event', fn);
        obs.pub('event');

        expect(fn).not.toBeCalledTimes(2);
        expect(fn2).toBeCalledTimes(2);
    });
});
