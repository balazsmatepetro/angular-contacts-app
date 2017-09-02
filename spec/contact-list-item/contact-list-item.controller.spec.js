import angular from 'angular';
import Contact from '../../src/core/contact.entity';
import ContactPresenter from '../../src/core/contact.presenter';
import ContactListItemController from '../../src/contact-list-item/contact-list-item.controller';
import * as Events from '../../src/contact-list-item/contact-list-item.events';

describe('ContactListItemController', () => {
    const EVENT_NAME = Events.CONTACT_LIST_ITEM_TOGGLE_SELECTED_CONTACT;
    let _$scope_ = undefined;
    let controller = undefined;
    let contact = undefined;
    let contactPresenter = undefined;

    beforeEach(() => {
        angular.injector(['ng']).invoke(($rootScope) => {
            _$scope_ = $rootScope.$new();
            controller = new ContactListItemController(_$scope_);
            contact = new Contact(1, '', '');
            contactPresenter = new ContactPresenter(contact, true, true);

            controller.contactPresenter = contactPresenter;
        });
    });

    describe('toggleContact', () => {
        let emitSpy = undefined;

        beforeEach(() => {
            emitSpy = spyOn(_$scope_, '$emit').and.callThrough();
        });

        it('should emit event with the current contact presenter when the item is inactive', () => {
            controller.contactPresenter.isActive = false;

            controller.toggleContact();

            expect(emitSpy).toHaveBeenCalledWith(EVENT_NAME, {
                selectedContact: controller.contactPresenter
            });
        });

        it('should emit event with null when the item is active', () => {
            controller.contactPresenter.isActive = true;

            controller.toggleContact();

            expect(emitSpy).toHaveBeenCalledWith(EVENT_NAME, {
                selectedContact: null
            });
        });
    });

    describe('getItemClass', () => {
        it('should return with correct value when the item is active', () => {
            controller.contactPresenter.isActive = true;

            expect(controller.getItemClass()).toEqual({
                'contact-list-item-active': true
            });
        });

        it('should return with correct value when the item is not active', () => {
            controller.contactPresenter.isActive = false;

            expect(controller.getItemClass()).toEqual({
                'contact-list-item-active': false
            });
        });
    });
});
