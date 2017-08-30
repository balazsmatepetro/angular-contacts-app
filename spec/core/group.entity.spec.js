import Group from '../../src/core/group.entity';
import * as IntegerId from '../../src/core/is-integer-id';

describe('Group', () => {
    describe('invalid ID', () => {
        let isIntegerIdSpy = undefined;

        beforeEach(() => {
            isIntegerIdSpy = spyOn(IntegerId, 'default').and.returnValue(false);
        });

        it('should throw exception when the given ID is not an integer ID', () => {
            expect(() => new Group(1)).toThrow(new Error('The ID must be greater than zero!'));
            expect(isIntegerIdSpy).toHaveBeenCalled();
        });
    });

    describe('invalid name', () => {
        let isIntegerIdSpy = undefined;

        beforeEach(() => {
            isIntegerIdSpy = spyOn(IntegerId, 'default').and.returnValue(true);
        });

        it('should throw exception when the given name is not a string', () => {
            expect(() => new Group(1, 1)).toThrow(new Error('The given name must be a string!'));
            expect(isIntegerIdSpy).toHaveBeenCalled();
        });

        it('should throw exception when the given name is an empty string', () => {
            expect(() => new Group(1, '')).toThrow(new Error('The name cannot be an empty string!'));
            expect(isIntegerIdSpy).toHaveBeenCalled();
        });
    });

    describe('valid arguments', () => {
        it('should return the same values as the given', () => {
            const GROUP_ID = 1;
            const GROUP_NAME = 'Group';
            const GROUP = new Group(GROUP_ID, GROUP_NAME);

            expect(GROUP.id).toEqual(GROUP_ID);
            expect(GROUP.name).toEqual(GROUP_NAME);
        });
    });
});
