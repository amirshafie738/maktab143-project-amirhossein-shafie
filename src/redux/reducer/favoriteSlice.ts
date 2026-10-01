import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/types/product";

type FavoriteState = {
  items: Product[];
};

const initialState: FavoriteState = {
  items: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,

  reducers: {
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some(
        (product) => product.id === action.payload.id
      );

      if (exists) {
        state.items = state.items.filter(
          (product) => product.id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;