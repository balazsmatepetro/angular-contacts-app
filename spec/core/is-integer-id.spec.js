import isIntegerId from '../../src/core/is-integer-id';

describe('isIntegerId', () => {
    it('should return true when the given value is an integer and greater than zero', () => {
        validIntegerIds().forEach((validIntegerId) => {
            expect(isIntegerId(validIntegerId)).toBe(true);
        });
    });

    it('should return false when the given value is an integer and less than or equal to zero', () => {
        invalidIntegerIds().forEach((invalidIntegerId) => {
            expect(isIntegerId(invalidIntegerId)).toBe(false);
        });
    });

    it('should return false when the given value is not an integer', () => {
        nonIntegerValues().forEach((nonIntegerValue) => {
            expect(isIntegerId(nonIntegerValue)).toBe(false);
        });
    });

    function nonIntegerValues() {
        return [
            undefined,
            null,
            'string',
            '1',
            3.14,
            '3.14',
            true,
            {},
            () => {
                return 'string';
            },
            function () {
                return 'string';
            }
        ];
    }

    function invalidIntegerIds() {
        return [
            0,
            -1,
            -2,
            -3,
            -4
        ];
    }

    function validIntegerIds() {
        return [
            1,
            10,
            100,
            1000,
            10000,
            100000,
            1000000
        ];
    }
});
