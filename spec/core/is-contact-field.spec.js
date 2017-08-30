import ContactField from '../../src/core/contact-field.entity';
import isContactField from '../../src/core/is-contact-field';
import * as Types from '../../src/core/contact-field.types';

describe('isContact', () => {
    const CONTACT_FIELD = new ContactField(null, 'Label', Types.CONTACT_FIELD_TYPE_EMAIL, 'Value');

    it('should return true when the given value is a ContactField instance', () => {
        expect(isContactField(CONTACT_FIELD)).toBe(true);
    });

    it('should return false when the given value is not a ContactField instance', () => {
        invalidValues().forEach((invalidValue) => {
            expect(isContactField(invalidValue)).toBe(false);
        });
    });

    function invalidValues() {
        return [
            1,
            'string',
            new Number(1),
            {},
            [],
            () => CONTACT_FIELD,
            function () {
                return CONTACT_FIELD;
            }
        ];
    }
});
