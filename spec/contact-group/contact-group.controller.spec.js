import ContactGroupController from '../../src/contact-group/contact-group.controller';
import * as Narrow from '../../src/core/narrow-visible-contact-presenters';
import ContactGroup from '../../src/contact-group/contact-group.entity';
import helper from '../../src/contact-group/contact-group.helper';

describe('ContactGroupController', () => {
    let controller = undefined;
    let narrowSpy = undefined;

    beforeEach(() => {
        controller = new ContactGroupController;
        narrowSpy = spyOn(Narrow, 'default');
    });

    describe('hasVisibleContact', () => {
        beforeEach(() => {
            controller.contactGroup = new ContactGroup('Group 1');
        });

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

    describe('isEmptyNamedGroup', () => {
        it('should return true when group is an empty named group', () => {
            controller.contactGroup = new ContactGroup(helper.emptyGroupName);

            expect(controller.isEmptyNamedGroup()).toBe(true);
        });

        it('should return false when group is not an empty named group', () => {
            controller.contactGroup = new ContactGroup('Not empty');

            expect(controller.isEmptyNamedGroup()).toBe(false);
        });
    });
});
