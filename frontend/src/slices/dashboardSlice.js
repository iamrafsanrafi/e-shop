import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentTab: "Profile"
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setCurrentTab: (state, action) => {
            state.currentTab = action.payload;
        }
    },
});

export const { setCurrentTab } = dashboardSlice.actions;
export default dashboardSlice.reducer;
