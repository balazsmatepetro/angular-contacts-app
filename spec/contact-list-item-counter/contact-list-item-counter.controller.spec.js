import ContactListItemCounterController from '../../src/contact-list-item-counter/contact-list-item-counter.controller';
import Contact from '../../src/core/contact.entity';
import ContactPresenter from '../../src/core/contact.presenter';
import * as Narrow from '../../src/core/narrow-visible-contact-entries';

describe('ContactListItemCounterController', () => {
    let controller = undefined;

    beforeEach(() => {
        controller = new ContactListItemCounterController;
    });

    describe('count', () => {
        it('should return the length of filtered collection', () => {
            const CONTACT_PRESENTERS = [
                new ContactPresenter(new Contact(1, 'Sterling', 'Archer'), true),
                new ContactPresenter(new Contact(2, 'Malory', 'Archer'), false),
                new ContactPresenter(new Contact(3, 'Lana', 'Kane'), true)
            ];

            const FILTER_SPY = spyOn(Narrow, 'default').and.callThrough();

            controller.contacts = CONTACT_PRESENTERS;

            const RESULT = controller.count();

            expect(RESULT).toEqual(2);
            expect(FILTER_SPY).toHaveBeenCalledWith(CONTACT_PRESENTERS);
        });
    });

    describe('getSuffixText', () => {
        const FORM_PLURAL = 'contacts';
        const FORM_SINGULAR = 'contact';

        it('should return plural form when count return zero', () => {
            expectCorrectForm(0, FORM_PLURAL);
        });

        it('should return singular form when count returns one', () => {
            expectCorrectForm(1, FORM_SINGULAR);
        });

        it('should return plural form when count return greater than one', () => {
            expectCorrectForm(2, FORM_PLURAL);
        });

        function expectCorrectForm(returnValue, expectedForm) {
            const COUNT_SPY = spyOn(controller, 'count').and.returnValue(returnValue);

            expect(controller.getSuffixText()).toEqual(expectedForm);
            expect(COUNT_SPY).toHaveBeenCalled();
        }
    });
});
