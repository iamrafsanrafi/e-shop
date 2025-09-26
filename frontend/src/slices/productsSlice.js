import { createSlice } from '@reduxjs/toolkit'

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        featured: [],
        new: [],
        bestSeller: [],
        springSale: [],
        allProducts: [],
        minValue: 0,
        maxValue: 5000,
        category: "",
        isFromNavbar: false
    },
    reducers: {
        setFeaturedProducts: (state, action) => {
            state.featured = [...action.payload];
        },

        setNewProducts: (state, action) => {
            state.new = [...action.payload];
        },

        setBestSellerProducts: (state, action) => {
            state.bestSeller = [...action.payload];
        },

        setSpringSaleProducts: (state, action) => {
            state.springSale = [...action.payload];
        },

        setAllProducts: (state, action) => {
            state.allProducts = [...action.payload];
        },

        setMin: (state, action) => {
            state.minValue = action.payload;
        },

        setMax: (state, action) => {
            state.maxValue = action.payload;
        },

        setCategory: (state, action) => {
            state.category = action.payload;
        },

        clearCategory: (state) => {
            state.category = "";
        },

        setFromNavbar: (state, action) => {
            state.isFromNavbar = action.payload;
        }
    },
})

export const { setFeaturedProducts, setNewProducts, setBestSellerProducts, setSpringSaleProducts, setAllProducts, setMin, setMax, setCategory, clearCategory, setFromNavbar } = productsSlice.actions

export default productsSlice.reducer