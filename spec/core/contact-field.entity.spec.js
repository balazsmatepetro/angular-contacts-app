import * as Types from '../../src/core/contact-field.types';
import ContactField from '../../src/core/contact-field.entity';
import uniqueId from 'lodash.uniqueid';

describe('ContactField', () => {
    const CONTACT_FIELD_ID = undefined;
    const CONTACT_FIELD_LABEL = 'Label';
    const CONTACT_FIELD_TYPE = Types.CONTACT_FIELD_TYPE_EMAIL;
    const CONTACT_FIELD_VALUE = 'value';

    describe('failure', () => {
        it('should throw exception when given is not nil or unique ID', () => {
            invalidIds().forEach((invalidId) => {
                expect(() => new ContactField(invalidId))
                    .toThrow(new Error('The ID must be a nil (undefined, null) or a unique string ID'));
            });
        });

        it('should throw exception when the given label is not a string', () => {
            invalidLabels().forEach((invalidLabel) => {
                expect(() => new ContactField(CONTACT_FIELD_ID, invalidLabel))
                    .toThrow(new Error('The label must be a string!'));
            });
        });

        it('should throw exception when the given type is invalid', () => {
            invalidTypes().forEach((invalidType) => {
                expect(() => new ContactField(CONTACT_FIELD_ID, CONTACT_FIELD_LABEL, invalidType))
                    .toThrow(new Error('Invalid type given!'));
            });
        });

        it('should throw exception when the given value is invalid', () => {
            invalidValues().forEach((invalidValue) => {
                expect(() => new ContactField(
                    CONTACT_FIELD_ID,
                    CONTACT_FIELD_LABEL,
                    CONTACT_FIELD_TYPE,
                    invalidValue
                ))
                    .toThrow(new Error('The value must be a string!'));
            });
        });

        function invalidIds() {
            return [
                '',
                1,
                3.14,
                {},
                [],
                new Number(1),
                true,
                () => 'unique-id',
                function () {
                    return undefined;
                }
            ];
        }

        function invalidLabels() {
            return [
                1,
                3.14,
                {},
                [],
                new Number(1),
                true,
                () => 'label',
                function () {
                    return 'label';
                }
            ];
        }

        function invalidTypes() {
            return [
                1,
                3.14,
                {},
                [],
                new Number(1),
                true,
                undefined,
                null,
                'type',
                () => 'type',
                function () {
                    return 'type';
                }
            ];
        }

        function invalidValues() {
            return [
                1,
                3.14,
                {},
                [],
                new Number(1),
                true,
                undefined,
                null,
                () => 'value',
                function () {
                    return 'value';
                }
            ];
        }
    });

    describe('success', () => {
        it('should create a new instance when the given ID is a valid ID', () => {
            validIds().forEach((validId) => {
                const CONTACT_FIELD = new ContactField(
                    validId,
                    CONTACT_FIELD_LABEL,
                    CONTACT_FIELD_TYPE,
                    CONTACT_FIELD_VALUE
                );

                expect(CONTACT_FIELD.id).toEqual(validId);
            });
        });

        it('should create a new instance when the given label is valid', () => {
            const CONTACT_FIELD = new ContactField(
                CONTACT_FIELD_ID,
                CONTACT_FIELD_LABEL,
                CONTACT_FIELD_TYPE,
                CONTACT_FIELD_VALUE
            );

            expect(CONTACT_FIELD.label).toEqual(CONTACT_FIELD_LABEL);
        });

        it('should create a new instance when the given type is valid', () => {
            validTypes().forEach((validType) => {
                const CONTACT_FIELD = new ContactField(
                    CONTACT_FIELD_ID,
                    CONTACT_FIELD_LABEL,
                    validType,
                    CONTACT_FIELD_VALUE
                );

                expect(CONTACT_FIELD.type).toEqual(validType);
            });
        });

        it('should create a new instance when the given value is valid', () => {
            const CONTACT_FIELD = new ContactField(
                CONTACT_FIELD_ID,
                CONTACT_FIELD_LABEL,
                CONTACT_FIELD_TYPE,
                CONTACT_FIELD_VALUE
            );

            expect(CONTACT_FIELD.value).toEqual(CONTACT_FIELD_VALUE);
        });

        function validIds() {
            return [
                undefined,
                null,
                uniqueId('contact_field_'),
                'unique-id'
            ];
        }

        function validTypes() {
            return [
                Types.CONTACT_FIELD_TYPE_EMAIL,
                Types.CONTACT_FIELD_TYPE_PHONE_NUMBER
            ];
        }
    });
});
