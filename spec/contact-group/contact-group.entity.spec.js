import ContactGroup from '../../src/contact-group/contact-group.entity';
import Contact from '../../src/core/contact.entity';
import ContactPresenter from '../../src/core/contact.presenter';

describe('ContactGroup', () => {
    it('should throw exception when the given name is not a string', () => {
        getInvalidNames().forEach((invalidName) => {
            expect(() => new ContactGroup(invalidName)).toThrow(new Error('The name must be a string!'));
        });
    });

    it('should throw exception when the given name is an empty string', () => {
        expect(() => new ContactGroup('')).toThrow(new Error('The name cannot be an empty string!'));
    });

    it('should throw exception when the given contacts argument is not an array', () => {
        getInvalidContactTypes().forEach((invalidContactType) => {
            expect(() => new ContactGroup('Group 1', invalidContactType)).toThrow(new Error('The "contacts" argument must be an array!'));
        });
    });

    it('should throw exception when of the contacts is not a Contact or ContactPresenter instance', () => {
        const CONTACTS = [
            new Contact(1, 'John', 'Doe'),
            new Number(1)
        ];

        expect(() => new ContactGroup('Group 1', CONTACTS)).toThrow(new Error('All items must an instance of Contact or ContactPresenter!'));
    });

    it('should return the same name as the given', () => {
        const GROUP_NAME = 'Group 1';
        const CONTACT_GROUP = new ContactGroup(GROUP_NAME);

        expect(CONTACT_GROUP.name).toEqual(GROUP_NAME);
    });

    it('should return an empty array when no contacts provided', () => {
        const CONTACT_GROUP = new ContactGroup('Group 1');

        expect(Array.isArray(CONTACT_GROUP.contacts)).toBe(true);
        expect(CONTACT_GROUP.contacts.length).toEqual(0);
    });

    it('should accept Contact and ContactPresenter instances', () => {
        const CONTACT = new Contact(1, 'John', 'Doe');
        const CONTACT_PRESENTER = new ContactPresenter(CONTACT);
        const CONTACTS = [CONTACT, CONTACT_PRESENTER];
        const CONTACT_GROUP = new ContactGroup('Group 1', CONTACTS);

        expect(Array.isArray(CONTACT_GROUP.contacts)).toBe(true);
        expect(CONTACT_GROUP.contacts.length).toEqual(CONTACTS.length);
        expect(CONTACT_GROUP.contacts[0] instanceof Contact).toBe(true);
        expect(CONTACT_GROUP.contacts[1] instanceof ContactPresenter).toBe(true);
    });

    function getInvalidContactTypes() {
        return [
            1,
            new Number(1),
            () => [],
            true,
            null,
            3.14,
            function () {
                return [];
            }
        ];
    }

    function getInvalidNames() {
        return [
            1,
            new Number(1),
            () => 'Name',
            true,
            null,
            undefined,
            3.14,
            ['Name'],
            function () {
                return 'Name';
            }
        ];
    }
});
