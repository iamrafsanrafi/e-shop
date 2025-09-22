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
        maxValue: 5000
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
        }
    },
})

export const { setFeaturedProducts, setNewProducts, setBestSellerProducts, setSpringSaleProducts, setAllProducts, setMin, setMax} = productsSlice.actions

export default productsSlice.reducer