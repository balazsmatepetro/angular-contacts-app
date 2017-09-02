import ContactField from '../core/contact-field.entity';
import * as ContactFieldTypes from '../core/contact-field.types';
import Group from '../core/group.entity';
import isIntegerId from '../core/is-integer-id';
import find from 'lodash.find';

export default class ContactEditorController {
    constructor(contactService) {
        this.contactService = contactService;

        this.contactFieldTypes = [
            {
                id: ContactFieldTypes.CONTACT_FIELD_TYPE_EMAIL,
                name: 'E-mail'
            },
            {
                id: ContactFieldTypes.CONTACT_FIELD_TYPE_PHONE_NUMBER,
                name: 'Phone Number'
            }
        ];

        this.groups = [
            new Group(1, 'Group 1'),
            new Group(2, 'Group 2'),
            new Group(3, 'Group 3')
        ];
    }

    /**
     * Adds a new contact field to the contact.
     * 
     * @memberof ContactEditorController
     */
    addContactField() {
        this.contact.contactFields.push(
            new ContactField(null, '', ContactFieldTypes.CONTACT_FIELD_TYPE_EMAIL, '')
        );
    }

    /**
     * Deletes the contact field by index.
     * 
     * @param {Number} index The index of contact field to remove.
     * @memberof ContactEditorController
     */
    deleteContactField(index) {
        this.contact.contactFields.splice(index, 1);
    }

    hasGroup(group) {

        // console.log(group);

        return !!find(this.contact.groups, (item) => group.id === item.id);
    }

    save() {
        console.log(this.contact);

        /*
        if (isIntegerId(this.contact.id)) {
            this.contactService.update(this.contact);
        } else {
            this.contactService.create(this.contact);
        }
        */
    }

    /**
     * Returns the injectable names.
     * 
     * @returns {Array.<String>}
     * @readonly
     * @static
     * @memberof SearchController
     */
    static get $inject() {
        return [
            'contactService'
        ];
    }
}
