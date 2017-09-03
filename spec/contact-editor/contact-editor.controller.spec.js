import Contact from '../../src/core/contact.entity';
import ContactField from '../../src/core/contact-field.entity';
import * as ContactFieldTypes from '../../src/core/contact-field.types';
import ContactService from '../../src/core/contact.service';
import Group from '../../src/core/group.entity';
import GroupPresenter from '../../src/core/group-presenter.entity';
import ContactEditorController from '../../src/contact-editor/contact-editor.controller';

describe('ContactEditorController', () => {
    let contactService = undefined;
    let controller = undefined;
    let contact = undefined;

    beforeEach(() => {
        contactService = new ContactService;
        contact = new Contact(undefined, 'John', 'Doe');

        controller = new ContactEditorController(contactService);
        controller.contact = contact;
    });

    describe('init', () => {
        const GROUPS = [
            new Group(1, 'Group 1'),
            new Group(2, 'Group 2')
        ];

        beforeEach(() => {
            controller.groupPresenters = [
                new GroupPresenter(GROUPS[0]),
                new GroupPresenter(GROUPS[1])
            ];
        });

        it('should mark as selected only those groups which are belong to the contact', () => {
            controller.contact.groups.push(GROUPS[1]);

            controller.init();

            expect(controller.groupPresenters[0].name).toEqual(GROUPS[0].name);
            expect(controller.groupPresenters[0].isSelected).toBe(false);
            expect(controller.groupPresenters[1].name).toEqual(GROUPS[1].name);
            expect(controller.groupPresenters[1].isSelected).toBe(true);
        });
    });

    describe('addContactField', () => {
        it('should add new contact field', () => {
            const CONTACT_FIELDS = controller.contact.contactFields;

            expect(CONTACT_FIELDS.length).toEqual(0);

            controller.addContactField();

            expect(CONTACT_FIELDS.length).toEqual(1);
            expect(CONTACT_FIELDS[0] instanceof ContactField).toBe(true);
        });
    });

    describe('deleteContactField', () => {
        beforeEach(() => {
            controller.contact.contactFields = [
                new ContactField('contact-field-1', 'Label 1', ContactFieldTypes.CONTACT_FIELD_TYPE_EMAIL, 'Value 1'),
                new ContactField('contact-field-2', 'Label 2', ContactFieldTypes.CONTACT_FIELD_TYPE_PHONE_NUMBER, 'Value 2'),
                new ContactField('contact-field-3', 'Label 3', ContactFieldTypes.CONTACT_FIELD_TYPE_EMAIL, 'Value 3')
            ];
        });

        it('should remove contact field when contact field can be found on the given index', () => {
            const CONTACT_FIELDS = controller.contact.contactFields;

            expect(CONTACT_FIELDS.length).toEqual(3);

            controller.deleteContactField(1);

            expect(CONTACT_FIELDS.length).toEqual(2);
            expect(CONTACT_FIELDS[0].label).toEqual('Label 1');
            expect(CONTACT_FIELDS[1].label).toEqual('Label 3');

            controller.deleteContactField(0);

            expect(CONTACT_FIELDS.length).toEqual(1);
            expect(CONTACT_FIELDS[0].label).toEqual('Label 3');
        });

        it('should do nothing when the contact field cannot be found on the given index', () => {
            const CONTACT_FIELDS = controller.contact.contactFields;

            expect(CONTACT_FIELDS.length).toEqual(3);

            controller.deleteContactField(-1);

            expect(CONTACT_FIELDS.length).toEqual(3);

            controller.deleteContactField(100);

            expect(CONTACT_FIELDS.length).toEqual(3);
        });
    });

    describe('save', () => {
        // TODO: Finish this!
    });

    describe('toggleGroup', () => {
        const GROUPS = [
            new Group(1, 'Group 1'),
            new Group(2, 'Group 2')
        ];

        beforeEach(() => {
            controller.groupPresenters = [
                new GroupPresenter(GROUPS[0]),
                new GroupPresenter(GROUPS[1])
            ];
        });

        it('should add group to the contact if group does not belong to the contact', () => {
            const CONTACT_GROUPS = controller.contact.groups;
            const CONTACT_GROUP_PRESENTERS = controller.groupPresenters;

            expect(CONTACT_GROUPS.length).toEqual(0);
            expect(CONTACT_GROUP_PRESENTERS[0].isSelected).toBe(false);
            expect(CONTACT_GROUP_PRESENTERS[1].isSelected).toBe(false);

            controller.toggleGroup(CONTACT_GROUP_PRESENTERS[0]);

            expect(CONTACT_GROUPS.length).toEqual(1);
            expect(CONTACT_GROUP_PRESENTERS[0].isSelected).toBe(true);
            expect(CONTACT_GROUP_PRESENTERS[1].isSelected).toBe(false);
        });

        it('should remove group from contact if group belongs to the contact', () => {
            const CONTACT_GROUPS = controller.contact.groups;
            const CONTACT_GROUP_PRESENTERS = controller.groupPresenters;

            controller.toggleGroup(CONTACT_GROUP_PRESENTERS[0]);

            expect(CONTACT_GROUPS.length).toEqual(1);
            expect(CONTACT_GROUP_PRESENTERS[0].isSelected).toBe(true);
            expect(CONTACT_GROUP_PRESENTERS[1].isSelected).toBe(false);

            controller.toggleGroup(CONTACT_GROUP_PRESENTERS[0]);

            expect(CONTACT_GROUPS.length).toEqual(0);
            expect(CONTACT_GROUP_PRESENTERS[0].isSelected).toBe(false);
            expect(CONTACT_GROUP_PRESENTERS[1].isSelected).toBe(false);
        });
    });
});
