import heroku from '../../src/services/HerokuApi';
import {ContactApi} from "../../src/services/ContactApi";


describe('HerokuApi', () => {
    it('should returns instance of ContactApi', () => {
        expect(heroku).toBeInstanceOf(ContactApi);
    });
});
