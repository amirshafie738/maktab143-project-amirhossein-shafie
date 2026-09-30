import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducer/cartSlice";
import storage from "redux-persist/es/storage";

import {
  FLUSH,
  PAUSE,
  PURGE,
  REGISTER,
  REHYDRATE,
  PERSIST,
} from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PURGE,
          REGISTER,
          PERSIST,
        ],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;