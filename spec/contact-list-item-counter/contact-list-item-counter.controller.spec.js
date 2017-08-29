import ContactListItemCounterController from '../../src/contact-list-item-counter/contact-list-item-counter.controller';
import * as Narrow from '../../src/core/narrow-visible-contact-presenters';

describe('ContactListItemCounterController', () => {
    let controller = undefined;

    beforeEach(() => {
        controller = new ContactListItemCounterController;
    });

    describe('count', () => {
        it('should return the length of filtered collection', () => {
            const RETURN_VALUE = [1, 2];

            const FILTER_SPY = spyOn(Narrow, 'default').and.callFake(() => RETURN_VALUE);

            const RESULT = controller.count();

            expect(RESULT).toEqual(RETURN_VALUE.length);
            expect(FILTER_SPY).toHaveBeenCalled();
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
