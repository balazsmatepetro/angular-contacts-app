import ContactGroup from '../../src/contact-group/contact-group.entity';
import ContactGroupMap from '../../src/contact-group/contact-group.contact-group-map';

describe('ContactGroupMap', () => {
    describe('constructor', () => {
        it('should throw exception when the given argument is not an array', () => {
            expect(() => new ContactGroupMap(1)).toThrow(new Error('The given argument must be an array!'));
        });

        it('should throw exception when one of the values is not a ContactGroup instance', () => {
            expect(() => new ContactGroupMap([new Number(1)])).toThrow(new Error('All items must be an instance of ContactGroup'));
        });

        it('should contain an empty array when no argument given', () => {
            const MAP = new ContactGroupMap;

            expect(Array.isArray(MAP.groups)).toBe(true);
            expect(MAP.groups.length).toEqual(0);
        });

        it('should contain a collection of ContactGroups when valid argument given', () => {
            const DATA = [
                new ContactGroup('Group 1', []),
                new ContactGroup('Group 2', [])
            ];

            const MAP = new ContactGroupMap(DATA);

            expect(Array.isArray(MAP.groups)).toBe(true);
            expect(MAP.groups.length).toEqual(2);
        });
    });

    describe('methods', () => {
        const GROUP_NAME_DEFAULT = 'Group 1';
        const GROUP_NAME_NOT_EXISTING = 'Not existing';

        const DATA = [
            new ContactGroup(GROUP_NAME_DEFAULT, [])
        ];

        let map = undefined;

        beforeEach(() => {
            map = new ContactGroupMap(DATA);
        });

        describe('getGroup', () => {
            it('should return ContactGroup when the group exists in the map', () => {
                const RESULT = map.getGroup(GROUP_NAME_DEFAULT);

                expect(RESULT).toBeDefined();
                expect(RESULT instanceof ContactGroup).toBe(true);
                expect(RESULT.name).toEqual(DATA[0].name);
            });

            it('should return undefined when the group does not exist in the map', () => {
                expect(map.getGroup(GROUP_NAME_NOT_EXISTING)).not.toBeDefined();
            });
        });

        describe('hasGroup', () => {
            it('should return true when the group exists in the map', () => {
                expect(map.hasGroup(GROUP_NAME_DEFAULT)).toBe(true);
            });

            it('should return false when the group does not exist in the map', () => {
                expect(map.hasGroup(GROUP_NAME_NOT_EXISTING)).toBe(false);
            });
        });

        describe('setGroup', () => {
            it('should throw exception when the given value is not a ContactGroup instance', () => {
                const ERROR = new Error('The given argument must be instance of ContactGroup!');

                expect(() => map.setGroup(1)).toThrow(ERROR);
                expect(() => map.setGroup(new Number(1))).toThrow(ERROR);
            });

            it('should throw exception when the given group already exists', () => {
                expect(() => map.setGroup(new ContactGroup('Group 1', []))).toThrow(new Error('The given group already exists!'));
            });

            it('should add a new group', () => {
                const CONTACT_GROUP = new ContactGroup('Group 2', []);

                map.setGroup(CONTACT_GROUP);

                expect(map.groups.length).toEqual(2);
                expect(map.groups[0].name).toEqual(DATA[0].name);
                expect(map.groups[1].name).toEqual(DATA[1].name);
            });
        });
    });
});
