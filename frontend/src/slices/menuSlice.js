import { createSlice } from '@reduxjs/toolkit'

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    showMenu: false,
  },
  reducers: {
    openMenu: (state) => {
      state.showMenu = true;
    },
    closeMenu: (state) => {
      state.showMenu = false;
    }
  },
})

export const { openMenu, closeMenu } = menuSlice.actions

export default menuSlice.reducer