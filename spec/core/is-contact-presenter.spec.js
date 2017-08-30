import Contact from '../../src/core/contact.entity';
import ContactPresenter from '../../src/core/contact.presenter';
import isContactPresenter from '../../src/core/is-contact-presenter';

describe('isContactPresenter', () => {
    const CONTACT = new Contact(null, 'John', 'Doe');
    const CONTACT_PRESENTER = new ContactPresenter(CONTACT);

    it('should return true when the given value is a ContactPresenter instance', () => {
        expect(isContactPresenter(CONTACT_PRESENTER)).toBe(true);
    });

    it('should return false when the given value is not a ContactPresenter instance', () => {
        invalidValues().forEach((invalidValue) => {
            expect(isContactPresenter(invalidValue)).toBe(false);
        });
    });

    function invalidValues() {
        return [
            1,
            'string',
            new Number(1),
            {},
            [],
            () => CONTACT_PRESENTER,
            function () {
                return CONTACT_PRESENTER;
            }
        ];
    }
});
