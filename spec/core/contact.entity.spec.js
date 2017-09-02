import Contact from '../../src/core/contact.entity';
import ContactField from '../../src/core/contact-field.entity';
import Group from '../../src/core/group.entity';
import * as ContactFieldTypes from '../../src/core/contact-field.types';

describe('Contact', () => {
    const CONTACT_ID = 1;
    const CONTACT_FIRST_NAME = 'John';
    const CONTACT_LAST_NAME = 'Doe';
    const CONTACT_CONTACT_FIELDS = [
        new ContactField(
            'unique-id',
            'Label',
            ContactFieldTypes.CONTACT_FIELD_TYPE_EMAIL,
            'john@doe.com'
        )
    ];
    const CONTACT_GROUPS = [
        new Group(1, 'Group')
    ];

    describe('failure', () => {
        it('should throw exception when the given ID is invalid', () => {
            invalidIds().forEach((invalidId) => {
                expect(() => new Contact(invalidId))
                    .toThrow(new Error('The ID must be a nil (null, undefined) or an integer, which is greater than zero!'));
            });
        });

        it('should throw exception when the given first name or last name is not a string', () => {
            invalidNames().forEach((invalidName) => {
                expect(() => new Contact(
                    CONTACT_ID,
                    invalidName
                ))
                    .toThrow(new Error('The first name must be a string!'));

                expect(() => new Contact(
                    CONTACT_ID,
                    CONTACT_FIRST_NAME,
                    invalidName
                ))
                    .toThrow(new Error('The last name must be a string!'));
            });
        });

        it('should throw exception when the given contact field or group are not valid arrays', () => {
            invalidArrays().forEach((invalidArray) => {
                expect(() => new Contact(
                    CONTACT_ID,
                    CONTACT_FIRST_NAME,
                    CONTACT_LAST_NAME,
                    invalidArray
                ))
                    .toThrow(new Error('The contact fields argument must be an array!'));

                expect(() => new Contact(
                    CONTACT_ID,
                    CONTACT_FIRST_NAME,
                    CONTACT_LAST_NAME,
                    [],
                    invalidArray
                ))
                    .toThrow(new Error('The groups argument must be an array!'));
            });
        });

        it('should throw exception when one of the contact fields is not a ContactField instance', () => {
            const CONTACT_FIELDS = [
                new ContactField(null, 'Label', ContactFieldTypes.CONTACT_FIELD_TYPE_EMAIL, 'Value'),
                new Number(1)
            ];

            expect(() => new Contact(CONTACT_ID, CONTACT_FIRST_NAME, CONTACT_LAST_NAME, CONTACT_FIELDS))
                .toThrow(new Error('All contact field items must be an instance of ContactField!'));
        });

        it('should throw exception when one of the groups is not a Group instance', () => {
            const GROUPS = [
                new Group(1, 'Group'),
                new String('Group')
            ];

            expect(() => new Contact(CONTACT_ID, CONTACT_FIRST_NAME, CONTACT_LAST_NAME, CONTACT_CONTACT_FIELDS, GROUPS))
                .toThrow(new Error('All group items must be an instance of Group!'));
        });

        function invalidIds() {
            return [
                new Number(1),
                -1,
                0,
                'string',
                3.14,
                '3.14',
                false,
                {},
                [1],
                () => 1,
                function () {
                    return 1;
                }
            ];
        }

        function invalidNames() {
            return [
                new Number(1),
                -1,
                0,
                3.14,
                false,
                {},
                ['name'],
                () => 'name',
                function () {
                    return 'name';
                }
            ];
        }

        function invalidArrays() {
            return [
                new Number(1),
                -1,
                0,
                3.14,
                false,
                {},
                () => [],
                function () {
                    return [];
                }
            ];
        }
    });

    describe('success', () => {
        it('should accept nil and valid number values as ID', () => {
            validIds().forEach((validId) => {
                const CONTACT = new Contact(
                    validId,
                    CONTACT_FIRST_NAME,
                    CONTACT_LAST_NAME,
                    CONTACT_CONTACT_FIELDS,
                    CONTACT_GROUPS
                );

                expect(CONTACT.id).toEqual(validId);
            });
        });

        it('should accept valid first name and last name', () => {
            const CONTACT = new Contact(
                CONTACT_ID,
                CONTACT_FIRST_NAME,
                CONTACT_LAST_NAME,
                CONTACT_CONTACT_FIELDS,
                CONTACT_GROUPS
            );

            expect(CONTACT.firstName).toEqual(CONTACT_FIRST_NAME);
            expect(CONTACT.lastName).toEqual(CONTACT_LAST_NAME);
        });

        it('should accept valid contact field and groups', () => {
            const CONTACT = new Contact(
                CONTACT_ID,
                CONTACT_FIRST_NAME,
                CONTACT_LAST_NAME,
                CONTACT_CONTACT_FIELDS,
                CONTACT_GROUPS
            );

            expect(CONTACT.contactFields).toEqual(CONTACT_CONTACT_FIELDS);
            expect(CONTACT.groups).toEqual(CONTACT_GROUPS);
        });

        function validIds() {
            return [
                1,
                null,
                undefined
            ];
        }
    });
});
