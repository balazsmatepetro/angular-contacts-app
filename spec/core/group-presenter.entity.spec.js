import Group from '../../src/core/group.entity';
import GroupPresenter from '../../src/core/group-presenter.entity';
import * as isGroup from '../../src/core/is-group';

describe('GroupPresenter', () => {
    const GROUP = new Group(1, 'Group');

    describe('failure', () => {
        let isGroupSpy = undefined;

        beforeEach(() => {
            isGroupSpy = spyOn(isGroup, 'default').and.returnValue(false);
        });

        it('should throw exception when the given group argument is not a Group instance', () => {
            expect(() => new GroupPresenter(GROUP))
                .toThrow(new Error('The group argument must be an instance of Group!'));

            expect(isGroupSpy).toHaveBeenCalled();
        });
    });

    describe('success', () => {
        it('should create a new instance when valid Group instance given', () => {
            const GROUP_PRESENTER = new GroupPresenter(GROUP);

            expect(GROUP_PRESENTER.id).toEqual(GROUP.id);
            expect(GROUP_PRESENTER.name).toEqual(GROUP.name);
        });

        it('should create a new instance with false isSelected value when not provided', () => {
            const GROUP_PRESENTER = new GroupPresenter(GROUP);

            expect(GROUP_PRESENTER.isSelected).toBe(false);
        });

        it('should convert to boolean the given isSelected argument', () => {
            isSelectedValues().forEach((item) => {
                const GROUP_PRESENTER = new GroupPresenter(GROUP, item.argument);

                expect(GROUP_PRESENTER.isSelected).toEqual(item.expected);
            });
        });

        function isSelectedValues() {
            return [
                {
                    'argument': {},
                    'expected': true,
                },
                {
                    'argument': 0,
                    'expected': false,
                },
                {
                    'argument': 1,
                    'expected': true,
                }
            ];
        }
    });
});
