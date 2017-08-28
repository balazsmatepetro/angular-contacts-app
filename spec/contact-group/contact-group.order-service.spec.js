import ContactGroup from '../../src/contact-group/contact-group.entity';
import ContactGroupMap from '../../src/contact-group/contact-group.contact-group-map';
import OrderService from '../../src/contact-group/contact-group.order-service';
import helper from '../../src/contact-group/contact-group.helper';

describe('OrderService', () => {
    let service = undefined;

    beforeEach(() => {
        service = new OrderService;
    });

    describe('order', () => {
        it('should throw exception when the given argument is not an ContactGroupMap', () => {
            const ERROR = new Error('The given argument must be an instance of ContactGroupMap!');

            expect(() => service.order(1)).toThrow(ERROR);
            expect(() => service.order(new Number(1))).toThrow(ERROR);
        });

        it('should return an ordered array of ContactGroups', () => {
            const CONTACT_GROUPS = [
                new ContactGroup('m', []),
                new ContactGroup('a', []),
                new ContactGroup('y', [])
            ];

            const CONTACT_GROUP_MAP = new ContactGroupMap(CONTACT_GROUPS);

            const RESULT = service.order(CONTACT_GROUP_MAP);

            expect(Array.isArray(RESULT)).toBe(true);
            expect(RESULT.length).toEqual(3);

            RESULT.forEach((item) => {
                expect(item instanceof ContactGroup).toBe(true);
            });

            expect(RESULT[0].name).toEqual('a');
            expect(RESULT[1].name).toEqual('m');
            expect(RESULT[2].name).toEqual('y');
        });

        it('should push "empty named" group to the end of array', () => {
            const CONTACT_GROUPS = [
                new ContactGroup(helper.emptyGroupName, []),
                new ContactGroup('z', [])
            ];

            const CONTACT_GROUP_MAP = new ContactGroupMap(CONTACT_GROUPS);

            const RESULT = service.order(CONTACT_GROUP_MAP);

            expect(RESULT[0].name).toEqual('z');
            expect(RESULT[1].name).toEqual(helper.emptyGroupName);
        });
    });
});
