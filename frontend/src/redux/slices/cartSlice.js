import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [], // [{ productId, title, quantity, ... }]
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(
                (i) => i.productId === item.productId && i.size === item.size
            );
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push(item);
            }
        },
        removeFromCart: (state, action) => {
            const { productId, size } = action.payload;

            // حذف المنتج من السلة
            state.items = state.items.filter(
                item => !(item.productId === productId && item.size === size)
            );
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
