import Contact from '../../src/core/contact.entity';
import ContactPresenter from '../../src/core/contact-presenter.entity';
import * as isContact from '../../src/core/is-contact';

describe('ContactPresenter', () => {
    const CONTACT = new Contact(1, 'John', 'Doe');

    describe('failure', () => {
        let isContactSpy = undefined;

        beforeEach(() => {
            isContactSpy = spyOn(isContact, 'default').and.returnValue(false);
        });

        it('should throw exception when the given contact argument is not a Contact instance', () => {
            expect(() => new ContactPresenter(CONTACT))
                .toThrow(new Error('The contact argument must be an instance of Contact!'));

            expect(isContactSpy).toHaveBeenCalled();
        });
    });

    describe('success', () => {
        it('should create an instance when the given contact argument is valid', () => {
            const CONTACT_PRESENTER = new ContactPresenter(CONTACT);

            expect(CONTACT_PRESENTER.id).toEqual(CONTACT.id);
            expect(CONTACT_PRESENTER.firstName).toEqual(CONTACT.firstName);
            expect(CONTACT_PRESENTER.lastName).toEqual(CONTACT.lastName);
        });

        it('should create an instance with true isVisible field when the value is not provided', () => {
            const CONTACT_PRESENTER = new ContactPresenter(CONTACT);

            expect(CONTACT_PRESENTER.isVisible).toBe(true);
        });

        it('should create an instance with false isActive field when the value is not provided', () => {
            const CONTACT_PRESENTER = new ContactPresenter(CONTACT);

            expect(CONTACT_PRESENTER.isActive).toBe(false);
        });

        it('should convert to boolean the given isVisible and isActive arguments', () => {
            convertToBooleans().forEach((item) => {
                const CONTACT_PRESENTER = new ContactPresenter(CONTACT, item.argument, item.argument);

                expect(CONTACT_PRESENTER.isActive).toEqual(item.expected);
                expect(CONTACT_PRESENTER.isVisible).toEqual(item.expected);
            });
        });

        function convertToBooleans() {
            return [
                {
                    'argument': {},
                    'expected': true,
                },
                {
                    'argument': 0,
                    'expected': false,
                },
                {
                    'argument': 1,
                    'expected': true,
                }
            ];
        }
    });
});
