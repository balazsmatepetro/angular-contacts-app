/**
 * Returns true if the value is an integer and greater than zero, else false.
 * 
 * @export
 * @param {Boolean} value The value to check.
 * @returns 
 */
export default function isValidIntegerId(value) {
    return isInteger(value) && 0 < value;
}

/**
 * Returns true if the given value is an integer, else false.
 * 
 * @param {any} value The value to check.
 * @returns {Boolean}
 */
function isInteger(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}
