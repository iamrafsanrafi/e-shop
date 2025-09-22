import { createSlice } from "@reduxjs/toolkit";

// Loading cart from localstorage if available
const loadCartFromLocalStorage = () => {
    try {
        const storedCart = localStorage.getItem("cart");

        return storedCart ? JSON.parse(storedCart) : [];
    }
    catch (e) {
        console.error(e.message);
        return [];
    }
}

// Calculating total
const calculateTotals = (items) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    return { totalItems, totalPrice };
}

const initialState = {
    items: loadCartFromLocalStorage(),
    totalItems: 0,
    totalPrice: 0,
}

// Initializing totals
const initialTotals = calculateTotals(initialState.items);
initialState.totalItems = initialTotals.totalItems;
initialState.totalPrice = initialTotals.totalPrice;

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);

            // If exists then increase the quantity
            if (existingItem) {
                existingItem.quantity += 1;
            }
            else {
                state.items.push({ ...product, quantity: product.quantity || 1 });
            }

            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;

            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);

            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;

            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((i) => i.id === id);

            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter(i => i.id !== id);
                }
                else {
                    item.quantity = quantity;
                }
            }

            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;

            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        clearCart: (state) => {
            state.items = [];
            state.totalItems = 0;
            state.totalPrice = 0;

            localStorage.removeItem("cart");
        },

        setCart: (state, action) => {
            // Setting cart products from firestore data
            state.items = action.payload || [];

            const totals = calculateTotals(state.items);
            state.totalItems = totals.totalItems;
            state.totalPrice = totals.totalPrice;

            localStorage.setItem("cart", JSON.stringify(state.items));
        }
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setCart,
} = cartSlice.actions;

export default cartSlice.reducer;