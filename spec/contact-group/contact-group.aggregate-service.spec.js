import AggregateService from '../../src/contact-group/contact-group.aggregate-service';
import Contact from '../../src/core/contact.entity';
import ContactGroupMap from '../../src/contact-group/contact-group.contact-group-map';
import ContactPresenter from '../../src/core/contact.presenter';

describe('AggregateService', () => {
    let service = undefined;

    beforeEach(() => {
        service = new AggregateService;
    });

    describe('aggregate', () => {
        it('should throw exception when the given argument is not an array', () => {
            expect(() => service.aggregate(1)).toThrow(new Error('The given argument must be an array!'));
        });

        it('should throw exception when the given argument is an empty array', () => {
            expect(() => service.aggregate([])).toThrow(new Error('The given array cannot be empty!'));
        });

        it('should throw exception when one of the items is not a ContactPresenter instance', () => {
            const EXPECTED_EXCEPTION = new Error('All items must be an instance of ContactPresenter');

            expect(() => service.aggregate(['string'])).toThrow(EXPECTED_EXCEPTION);
            expect(() => service.aggregate([new Number(1)])).toThrow(EXPECTED_EXCEPTION);
        });

        it('should aggregate ContactPresenter instances correctly', () => {
            const CONTACT_PRESENTERS = [
                new ContactPresenter(new Contact(null, 'Sterlin', 'Archer')),
                new ContactPresenter(new Contact(null, 'Malory', 'Archer')),
                new ContactPresenter(new Contact(null, 'Lana', 'Kane')),
                new ContactPresenter(new Contact(null, 'Cyril', 'Figgis')),
                new ContactPresenter(new Contact(null, 'Cheryl', 'Tunt')),
            ];

            const RESULT = service.aggregate(CONTACT_PRESENTERS);

            expect(RESULT instanceof ContactGroupMap).toBe(true);

            expect(RESULT.hasGroup('s')).toBe(true);
            expect(RESULT.hasGroup('m')).toBe(true);
            expect(RESULT.hasGroup('l')).toBe(true);
            expect(RESULT.hasGroup('c')).toBe(true);

            expect(RESULT.getGroup('s').contacts.length).toEqual(1);
            expect(RESULT.getGroup('m').contacts.length).toEqual(1);
            expect(RESULT.getGroup('l').contacts.length).toEqual(1);
            expect(RESULT.getGroup('c').contacts.length).toEqual(2);
        });
    });
});
