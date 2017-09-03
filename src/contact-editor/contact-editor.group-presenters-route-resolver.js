import Group from '../core/group.entity';
import GroupPresenter from '../core/group-presenter.entity';

/**
 * Maps the Group instances to GroupPresenter instances.
 * 
 * @export
 * @returns {Array.<GroupPresenter>}
 */
export default function groupPresentersRouteResolver() {
    // The array of groups.
    const GROUPS = [
        new Group(1, 'Family'),
        new Group(2, 'Friends'),
        new Group(3, 'Work')
    ];
    // Mapping groups to GroupPresenter instances.
    return GROUPS.map((group) => new GroupPresenter(group));
}
