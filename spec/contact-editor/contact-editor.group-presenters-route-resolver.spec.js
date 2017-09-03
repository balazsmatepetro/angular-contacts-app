import GroupPresenter from '../../src/core/group-presenter.entity';
import groupPresentersRouteResolver from '../../src/contact-editor/contact-editor.group-presenters-route-resolver';

describe('groupPresentersRouteResolver', () => {
    it('should map Group instances to GroupPresenter instances', () => {
        groupPresentersRouteResolver().forEach((item) => {
            expect(item instanceof GroupPresenter).toBe(true);
        });
    });

    it('should create deselected items', () => {
        groupPresentersRouteResolver().forEach((item) => {
            expect(item.isSelected).toBe(false);
        });
    });
});
