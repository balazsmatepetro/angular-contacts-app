import ContactGroup from '../../src/contact-group/contact-group.entity';
import isContactGroup from '../../src/contact-group/contact-group.is-contact-group';

describe('isContactGroup', () => {
    it('should return true when the given value is a ContactGroup instance', () => {
        expect(isContactGroup(new ContactGroup('Group 1', []))).toBe(true);
    });

    it('should return false when the given value is not a ContactGroup instance', () => {
        invalidValues().forEach((invalidValue) => {
            expect(isContactGroup(invalidValue)).toBe(false);
        });
    });

    function invalidValues() {
        return [
            1,
            'string',
            new Number(1),
            {},
            [],
            () => new ContactGroup('Group', []),
            function () {
                return new ContactGroup('Group', []);
            }
        ];
    }
});
