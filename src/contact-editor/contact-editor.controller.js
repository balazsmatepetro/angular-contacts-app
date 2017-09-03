import ContactField from '../core/contact-field.entity';
import Group from '../core/group.entity';
import * as ContactFieldTypes from '../core/contact-field.types';
import isIntegerId from '../core/is-integer-id';
import find from 'lodash.find';
import findIndex from 'lodash.findindex';

/**
 * The controller of contact editor component.
 * 
 * @export
 * @class ContactEditorController
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class ContactEditorController {
    /**
     * Creates an instance of ContactEditorController.
     * 
     * @param {ContactService} contactService The contact service instance.
     * @memberof ContactEditorController
     */
    constructor(contactService) {
        /**
         * The contact field types.
         * 
         * @type {Array.<{id: String, name: String}>}
         */
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
        // Setting contact service.
        this.contactService = contactService;
    }

    /**
     * Marks the necessary groups as selected.
     * 
     * @memberof ContactEditorController
     */
    init() {
        // Mapping group IDs to an array.
        const GROUP_IDS = this.contact.groups.map((group) => group.id);
        // We have to mark as selected those contacts which belong to the user.
        this.groupPresenters.forEach((groupPresenter) => {
            groupPresenter.isSelected = -1 !== GROUP_IDS.indexOf(groupPresenter.id);
        });
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
        if (undefined !== this.contact.contactFields[index]) {
            this.contact.contactFields.splice(index, 1);
        }
    }

    /**
     * Saves the contact.
     * 
     * @memberof ContactEditorController
     */
    save() {
        if (isIntegerId(this.contact.id)) {
            this.contactService.update(this.contact);
        } else {
            this.contactService.create(this.contact);
        }
    }

    /**
     * Toggling group.
     * 
     * @param {GroupPresenter} groupPresenter The GroupPresenter instance.
     * @memberof ContactEditorController
     */
    toggleGroup(groupPresenter) {
        // Toggling 'isSelected' value.
        groupPresenter.isSelected = !groupPresenter.isSelected;
        // Performing corresponding action.
        if (groupPresenter.isSelected) {
            // Looking for group.
            const HAS_GROUP = !!find(this.contact.groups, (group) => groupPresenter.id === group.id);
            // If the contact still not have has the selected group, we're going to add the selected group to the contact.
            if (!HAS_GROUP) {
                this.contact.groups.push(new Group(groupPresenter.id, groupPresenter.name));
            }
        } else {
            // Looking for group.
            const INDEX = findIndex(this.contact.groups, (group) => groupPresenter.id === group.id);
            // If the contact has the selected group, we're going to remove it.
            if (-1 !== INDEX) {
                this.contact.groups.splice(INDEX, 1);
            }
        }
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
