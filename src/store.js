import { configureStore } from "@reduxjs/toolkit";
import pet from "./slices/Pet";
const store = configureStore({
  reducer: {
    pet,
  },
});

export default store;
