import Contact from '../../src/core/contact.entity';
import isContact from '../../src/core/is-contact';

describe('isContact', () => {
    const CONTACT = new Contact(null, 'John', 'Doe');

    it('should return true when the given value is a Contact instance', () => {
        expect(isContact(CONTACT)).toBe(true);
    });

    it('should return false when the given value is not a Contact instance', () => {
        invalidValues().forEach((invalidValue) => {
            expect(isContact(invalidValue)).toBe(false);
        });
    });

    function invalidValues() {
        return [
            1,
            'string',
            new Number(1),
            {},
            [],
            () => CONTACT,
            function () {
                return CONTACT;
            }
        ];
    }
});
