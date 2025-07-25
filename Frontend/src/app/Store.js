import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/Blog/categorySlice";
import blogReducer from "../features/Blog/bloglistSlice";
import authReducer from "../features/Auth/userAuth";
import wishlistReducer from "../features/Blog/wishlist";
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    blog: blogReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
  },
});
