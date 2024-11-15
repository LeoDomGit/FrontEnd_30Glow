import { configureStore } from "@reduxjs/toolkit";
import shoppingCartReducer from "./reducers/shoppingCartSlice";
import serviceCartReducer from "./reducers/serviceCartSlice";

const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
    serviceCart: serviceCartReducer,
  },
});

export default store;
