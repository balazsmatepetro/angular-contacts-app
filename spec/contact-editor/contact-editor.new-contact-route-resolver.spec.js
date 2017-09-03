import angular from 'angular';
import Contact from '../../src/core/contact.entity';
import newContactResolver from '../../src/contact-editor/contact-editor.new-contact-route-resolver';

describe('newContactResolver', () => {
    let _$rootScope_ = undefined;
    let _$q_ = undefined;

    beforeEach(() => {
        angular.injector(['ng']).invoke(($rootScope, $q) => {
            _$rootScope_ = $rootScope;
            _$q_ = $q;
        });
    });

    it('should return a promise which is resolved with a Contact instance', () => {
        newContactResolver(_$q_).then((contact) => {
            expect(contact instanceof Contact).toBe(true);
            expect(contact.id).not.toBeDefined();
            expect(contact.firstName).toEqual('');
            expect(contact.lastName).toEqual('');
        });

        _$rootScope_.$digest();
    });
});
