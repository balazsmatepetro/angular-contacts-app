import Group from '../../src/core/group.entity';
import isGroup from '../../src/core/is-group';

describe('isGroup', () => {
    const GROUP = new Group(1, 'Group');

    it('should return true when the given value is a Group instance', () => {
        expect(isGroup(GROUP)).toBe(true);
    });

    it('should return false when the given value is not a Group instance', () => {
        invalidValues().forEach((invalidValue) => {
            expect(isGroup(invalidValue)).toBe(false);
        });
    });

    function invalidValues() {
        return [
            1,
            'string',
            new Number(1),
            {},
            [],
            () => GROUP,
            function () {
                return GROUP;
            }
        ];
    }
});
