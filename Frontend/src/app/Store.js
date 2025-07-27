import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/Blog/categorySlice";
import blogReducer from "../features/Blog/bloglistSlice";
import authReducer from "../features/Auth/userAuth";
import wishlistReducer from "../features/Blog/wishlist";
import authAdminReducer from "../features/Auth/adminAuth";
import dashboardReducer from "../features/Admin/dashboard";
import adminBlogReducer from "../features/Admin/addBlog";
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    blog: blogReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    authAdmin: authAdminReducer,
    dashboard: dashboardReducer,
    adminBlog: adminBlogReducer,
  },
});
