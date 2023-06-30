import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // check if item is already in cart
            const { id, name, price, image } = action.payload;
            const item = state.cart.find((item) => item.id === id);
            if (item) {
                item.quantity += 1;
            } else {
                state.cart.push({
                    id,
                    name,
                    price,
                    image,
                    quantity: 1,
                });
            }
            
        },
        
        increaseQuantity: (state, action) => {
            const { itemId } = action.payload;
            const item = state.cart.find((item) => item.id === itemId);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const { itemId } = action.payload;
            const item = state.cart.find((item) => item.id === itemId);
            if (item && item.quantity > 0) {
                item.quantity -= 1;
            }
        },

        // remove from cart
        removeProduct: (state, action) => {
            const { itemId } = action.payload;
            state.cart = state.cart.filter((item) => item.id !== itemId);
        },

    }
});

export const { addToCart, decreaseQuantity, increaseQuantity,   removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
