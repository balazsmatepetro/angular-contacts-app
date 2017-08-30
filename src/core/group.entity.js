import isIntegerId from './is-integer-id';
import isString from 'lodash.isstring';

/**
 * This class represents a group.
 * 
 * @export
 * @class Group
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class Group {
    /**
     * Creates an instance of Group.
     * 
     * @param {Number} id The ID of group.
     * @param {String} name The name of group.
     * @memberof Group
     */
    constructor(id, name) {
        // If the given ID is not an integer id, we have to throw an exception.
        if (!isIntegerId(id)) {
            throw new Error('The ID must be greater than zero!');
        }
        // If the given name is not a string, we have to throw an exception.
        if (!isString(name)) {
            throw new Error('The given name must be a string!');
        }
        // If the given name is an empty string, we have to throw an exception.
        if (0 === name.length) {
            throw new Error('The name cannot be an empty string!');
        }
        // Setting fields.
        this.id = id;
        this.name = name;
    }
}
