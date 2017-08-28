import Contact from '../../src/core/contact.entity';
import ContactPresenter from '../../src/core/contact.presenter';
import narrowVisibleContactEntries from '../../src/core/narrow-visible-contact-entries';

describe('narrowVisibleContactEntries', () => {
    it('should throw exception when the given argument is not an array', () => {
        expect(() => narrowVisibleContactEntries(true)).toThrow(new Error('The given argument must be an array'));
    });

    it('should throw exception when the given array is empty', () => {
        expect(() => narrowVisibleContactEntries([])).toThrow(new Error('The given array cannot be empty!'));
    });

    it('should return an empty array when the given items are not objects', () => {
        const DATA = [1, 'string', true];

        const RESULT = narrowVisibleContactEntries(DATA);

        expect(RESULT.length).toEqual(0);
    });

    it('should return empty array when the given items are not ContactPresenter instances', () => {
        const DATA = [new Date(), new String('value'), new Number(1)];

        const RESULT = narrowVisibleContactEntries(DATA);

        expect(RESULT.length).toEqual(0);
    });

    it('should filter only the visible contact items', () => {
        const CONTACTS = [
            new Contact(1, 'Al', 'Bundy', []),
            new Contact(2, 'Bud', 'Bundy', []),
            new Contact(3, 'Kelly', 'Bundy', [])
        ];

        const CONTACT_PRESENTERS = [
            new ContactPresenter(CONTACTS[0], true),
            new ContactPresenter(CONTACTS[1], false),
            new ContactPresenter(CONTACTS[2], true),
        ];

        const RESULT = narrowVisibleContactEntries(CONTACT_PRESENTERS);

        expect(RESULT.length).toEqual(2);

        expect(RESULT[0].id).toEqual(CONTACTS[0].id);
        expect(RESULT[0].firstName).toEqual(CONTACTS[0].firstName);
        expect(RESULT[0].isVisible).toBe(true);

        expect(RESULT[1].id).toEqual(CONTACTS[2].id);
        expect(RESULT[1].firstName).toEqual(CONTACTS[2].firstName);
        expect(RESULT[1].isVisible).toBe(true);
    });
});
