import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
    it("should return the intial state", () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: null,
            refreshToken: null,
            authRedirectPath: "/",
        });
    });

    it("should store the token upon login", () => {
        expect(
            reducer(
                { token: null, userId: null, error: null, loading: null, refreshToken: null, authRedirectPath: "/" },
                {
                    type: actionTypes.AUTH_SUCCESS,
                    idToken: "some-token",
                    userId: "some-user-id",
                }
            )
        ).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false,
            refreshToken: undefined,
            authRedirectPath: "/",
        });
    });
});
