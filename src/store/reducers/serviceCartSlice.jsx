import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("serviceCart")) || [],
};

export const serviceCartSlice = createSlice({
  name: "serviceCart",
  initialState,
  reducers: {
    addToServiceCart: (state, action) => {
      const newService = action.payload;
      const existingService = state.items.find((item) => item.id === newService.id);
      if (existingService) {
        existingService.quantity += newService.quantity;
      } else {
        state.items.push(newService);
      }
      localStorage.setItem("serviceCart", JSON.stringify(state.items));
    },
    removeFromServiceCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      localStorage.setItem("serviceCart", JSON.stringify(state.items));
    },
    increaseServiceQuantity: (state, action) => {
      const id = action.payload;
      const service = state.items.find((item) => item.id === id);
      if (service) {
        service.quantity += 1;
        localStorage.setItem("serviceCart", JSON.stringify(state.items));
      }
    },
    decreaseServiceQuantity: (state, action) => {
      const id = action.payload;
      const service = state.items.find((item) => item.id === id);
      if (service && service.quantity > 1) {
        service.quantity -= 1;
        localStorage.setItem("serviceCart", JSON.stringify(state.items));
      }
    },
    clearServiceCart: (state) => {
      state.items = [];
      localStorage.removeItem("serviceCart");
    },
  },
});

export const { addToServiceCart, removeFromServiceCart, increaseServiceQuantity, decreaseServiceQuantity, clearServiceCart } = serviceCartSlice.actions;
export default serviceCartSlice.reducer;
