import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    loading: true,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        removeUser: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        addUser: (state, action) => {
            state.error = action.payload;
            return state.error;
        }
    },
});

export const {setUser, removeUser, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;
