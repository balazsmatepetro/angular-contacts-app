import angular from 'angular';
import GroupPresenter from '../../src/core/group-presenter.entity';
import groupPresentersRouteResolver from '../../src/contact-editor/contact-editor.group-presenters-route-resolver';

describe('groupPresentersRouteResolver', () => {
    let _$rootScope_ = undefined;
    let _$q_ = undefined;

    beforeEach(() => {
        angular.injector(['ng']).invoke(($rootScope, $q) => {
            _$rootScope_ = $rootScope;
            _$q_ = $q;
        });
    });

    it('should map Group instances to GroupPresenter instances', () => {
        groupPresentersRouteResolver(_$q_).then((groupPresenters) => {
            groupPresenters.forEach((item) => {
                expect(item instanceof GroupPresenter).toBe(true);
            });
        });

        _$rootScope_.$digest();
    });

    it('should create deselected items', () => {
        groupPresentersRouteResolver(_$q_).then((groupPresenters) => {
            groupPresenters.forEach((item) => {
                expect(item.isSelected).toBe(false);
            });
        });

        _$rootScope_.$digest();
    });
});
