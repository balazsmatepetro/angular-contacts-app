import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ContactService from '../../src/core/contact.service';
import existingContactResolver from '../../src/contact-editor/contact-editor.existing-contact-route-resolver';

describe('existingContactResolver', () => {
    let _$rootScope_ = undefined;
    let _$q_ = undefined;
    let _$state_ = undefined;
    let _$stateParams_ = undefined;
    let contactService;

    beforeEach(() => {
        var mockApp = angular.module('mockApp', []).provider({
            $rootElement: function () {
                this.$get = function () {
                    return angular.element('<div ng-app></div>');
                };
            }
        });

        mockApp.config(['$qProvider', function ($qProvider) {
            $qProvider.errorOnUnhandledRejections(false);
        }]);

        angular.injector(['ng', 'mockApp', uiRouter]).invoke(($rootScope, $q, $state, $stateParams) => {
            _$rootScope_ = $rootScope;
            _$q_ = $q;
            _$state_ = $state;
            _$stateParams_ = $stateParams;
            contactService = new ContactService(_$q_);
        });
    });

    describe('success', () => {
        let findByIdSpy = undefined;

        beforeEach(() => {
            findByIdSpy = spyOn(contactService, 'findById').and.callFake(() => {
                const DEFERRED = _$q_.defer();

                DEFERRED.resolve(true);

                return DEFERRED.promise;
            });
        });

        it('should execute findById method when the contact can be located', () => {
            existingContactResolver(_$state_, _$stateParams_, contactService).then((contact) => {
                expect(contact).toBe(true);
                expect(findByIdSpy).toHaveBeenCalled();
            });

            _$rootScope_.$digest();
        });
    });

    describe('failure', () => {
        let findByIdSpy = undefined;
        let stateGoSpy = undefined;

        beforeEach(() => {
            findByIdSpy = spyOn(contactService, 'findById').and.callFake(() => {
                const DEFERRED = _$q_.defer();

                DEFERRED.reject(true);

                _$rootScope_.$digest();

                return DEFERRED.promise;
            });

            stateGoSpy = spyOn(_$state_, 'go').and.callFake(() => false);
        });

        it('should call $state.go when the contact could not be located', () => {
            existingContactResolver(_$state_, _$stateParams_, contactService).catch(() => {
                expect(findByIdSpy).toHaveBeenCalled();
                expect(stateGoSpy).toHaveBeenCalled();

                console.log('log');
            });
        });
    });
});
