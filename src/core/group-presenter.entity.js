import isGroup from './is-group';

/**
 * This class represents a group entry on the UI, essentially it's a decorated
 * group entry.
 * 
 * @export
 * @class GroupPresenter
 * @author Balázs Máté Petró <petrobalazsmate@gmail.com>
 */
export default class GroupPresenter {
    /**
     * Creates an instance of GroupPresenter.
     * 
     * @param {Group} group The group object.
     * @param {boolean} [isSelected=false] The group is selected or not.
     * @memberof GroupPresenter
     */
    constructor(group, isSelected = false) {
        // If the given group is not a Group instance, we have to throw an exception.
        if (!isGroup(group)) {
            throw new Error('The group argument must be an instance of Group!');
        }
        // Setting fields.
        this.id = group.id;
        this.name = group.name;
        this.isSelected = !!isSelected;
    }
}
