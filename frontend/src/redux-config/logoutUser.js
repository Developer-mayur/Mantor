import { createSlice } from "@reduxjs/toolkit"; // ✅ Import createSlice

const slice = createSlice({
    name: "UserSlice",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null,
        isLoggedIn: !!localStorage.getItem("token"),
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            delete state.user.password;
            state.token = action.payload.token;
            state.isLoggedIn = true;

            localStorage.setItem("user", JSON.stringify(state.user));
            localStorage.setItem("token", state.token);
        },
        logoutUser: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;

            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
});

// ✅ सही से export करें
export const { setUser, logoutUser } = slice.actions;
export default slice.reducer;
