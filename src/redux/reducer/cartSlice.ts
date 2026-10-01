import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity: number;
      }>
    ) => {
      const { product, quantity } = action.payload;

      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + quantity,
          product.quantity
        );
      } else {
        state.items.push({
          product,
          quantity: Math.min(quantity, product.quantity),
        });
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<number>
    ) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );
    },

    updateCartQuantity: (
      state,
      action: PayloadAction<{
        id: number;
        quantity: number;
      }>
    ) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (!item) return;

      const quantity = Math.max(
        1,
        Math.min(
          action.payload.quantity,
          item.product.quantity
        )
      );

      item.quantity = quantity;
    },

    clearCart: (state) => {
      state.items = [];
    },

    setCart: (
      state,
      action: PayloadAction<CartItem[]>
    ) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;