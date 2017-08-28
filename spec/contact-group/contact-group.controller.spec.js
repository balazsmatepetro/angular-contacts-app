import ContactGroupController from '../../src/contact-group/contact-group.controller';
import * as Narrow from '../../src/core/narrow-visible-contact-entries';

describe('ContactGroupController', () => {
    let controller = undefined;
    let narrowSpy = undefined;

    beforeEach(() => {
        controller = new ContactGroupController;
        narrowSpy = spyOn(Narrow, 'default');
    });

    describe('hasVisibleContact', () => {
        it('should return true when the narrowed array is not empty', () => {
            expectReturnValue([1, 2], true);
        });

        it('should return false when the narrowed array is empty', () => {
            expectReturnValue([], false);
        });

        function expectReturnValue(returnValue, expectedReturnValue) {
            narrowSpy.and.callFake(() => returnValue);

            expect(controller.hasVisibleContact()).toBe(expectedReturnValue);
            expect(narrowSpy).toHaveBeenCalled();
        }
    });
});
