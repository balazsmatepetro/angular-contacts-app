import Group from '../core/group.entity';
import GroupPresenter from '../core/group-presenter.entity';

/**
 * Maps the Group instances to GroupPresenter instances.
 * 
 * @export
 * @param {Object} $q Angular $q service.
 * @returns {Array.<GroupPresenter>}
 */
export default function groupPresentersRouteResolver($q) {
    // The array of groups.
    const GROUPS = [
        new Group(1, 'Family'),
        new Group(2, 'Friends'),
        new Group(3, 'Work')
    ];
    // Creating deferred object.
    const DEFERRED = $q.defer();
    // Resolving deferred object with GroupPresenter instances.
    DEFERRED.resolve(GROUPS.map((group) => new GroupPresenter(group)));
    // Returning the promise.
    return DEFERRED.promise;
}
