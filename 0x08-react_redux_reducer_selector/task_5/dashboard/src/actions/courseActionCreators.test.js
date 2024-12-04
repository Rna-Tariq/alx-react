import { selectCourse, unSelectCourse } from "./courseActionCreators";
import { SELECT_COURSE, UNSELECT_COURSE } from "./courseActionTypes";

describe("courseActionCreators", () => {
    test("selectCourse action returns the correct payload", () => {
        const result = selectCourse(1);
        expect(result).toEqual({
            type: SELECT_COURSE,
            payload: { index: 1 },
        });
    });

    test("unSelectCourse action returns the correct payload", () => {
        const result = unSelectCourse(1);
        expect(result).toEqual({
            type: UNSELECT_COURSE,
            payload: { index: 1 },
        });
    });
});
