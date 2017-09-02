import angular from 'angular';
import Contact from '../../src/core/contact.entity';
import ContactService from '../../src/core/contact.service';
import SearchService from '../../src/search/search.service';

describe('SearchService', () => {
    const DATA = [
        new Contact(1, 'Sterling', 'Archer'),
        new Contact(2, 'Malory', 'Archer'),
        new Contact(3, 'Lana', 'Kane'),
        new Contact(4, 'John', 'Doe'),
        new Contact(5, 'Joe', 'Swanson'),
        new Contact(6, 'Paul', 'Parker')
    ];

    let _$rootScope_ = undefined;
    let _$q_ = undefined;
    let contactService = undefined;

    beforeEach(() => {
        contactService = new ContactService;

        angular.injector(['ng']).invoke(($rootScope, $q) => {
            _$rootScope_ = $rootScope;
            _$q_ = $q;
        });
    });

    describe('search', () => {
        let findAllSpy = undefined;
        let searchService = undefined;

        beforeEach(() => {
            findAllSpy = spyOn(contactService, 'findAll').and.callFake(() => {
                const DEFERRED = _$q_.defer();

                DEFERRED.resolve(DATA);

                _$rootScope_.$digest();

                return DEFERRED.promise;
            });

            searchService = new SearchService(contactService);
        });

        it('should throw exception when the given argument is not a string', () => {
            expect(() => searchService.search(1)).toThrow(new Error('The given search term must be a string!'));
        });

        it('should throw exception when the given argument is an empty string', () => {
            expect(() => searchService.search('')).toThrow(new Error('The given search term cannot be an empty string!'));
        });

        it('should return contacts that has first name match', () => {
            const EXPECTED_RESULT = [
                {
                    firstName: 'John',
                    lastName: 'Doe'
                },
                {
                    firstName: 'Joe',
                    lastName: 'Swanson'
                }
            ];

            expectResult('jo', EXPECTED_RESULT, true);
        });

        it('should return contacts that has last name match', () => {
            const EXPECTED_RESULT = [
                {
                    firstName: 'Sterling',
                    lastName: 'Archer'
                },
                {
                    firstName: 'Malory',
                    lastName: 'Archer'
                }
            ];

            expectResult('arch', EXPECTED_RESULT, true);
        });

        it('should return contacts that has first name and last name match as well', () => {
            const EXPECTED_RESULT = [
                {
                    firstName: 'Paul',
                    lastName: 'Parker'
                }
            ];

            expectResult('pa', EXPECTED_RESULT, true);
        });

        it('should return proper contacts when the search is case sensitive', () => {
            expectResult('ar', [], false);

            expectResult('Lan', [{ firstName: 'Lana', lastName: 'Kane' }], false);
        });

        it('should return empty result when no match', () => {
            expectResult('x', [], true);
        });

        function expectResult(term, expectedResult, caseInsensitive) {
            searchService.search(term, caseInsensitive).then((contacts) => {
                expect(contacts.length).toEqual(expectedResult.length);

                expectedResult.forEach((item, index) => {
                    Object.keys(item).forEach((key) => {
                        expect(contacts[index][key]).toEqual(item[key]);
                    });
                });

                expect(findAllSpy).toHaveBeenCalled();
            });

            _$rootScope_.$digest();
        }
    });
});
