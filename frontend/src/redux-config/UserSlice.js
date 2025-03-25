import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "UserSlice",
    initialState: {
        user: null,
        token: null,
        isLoggedIn: false
    },
    reducers: {
        setUser: (state, action) => {
            if (!action.payload) {
                console.error("Error: Payload is undefined in setUser");
                return;
            }

            console.log("Dispatching user data:", action.payload);

            state.user = action.payload.user || null;
            state.token = action.payload.token || null;
            state.isLoggedIn = Boolean(action.payload.user);

            if (state.user) {
                delete state.user.password; // Optional: Remove sensitive data
            }
        }
    }
});

export const { setUser } = slice.actions;
export default slice.reducer;
