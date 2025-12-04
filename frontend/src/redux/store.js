import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import { authApi } from "./features/auth/authApi";
import { tweetApi } from "./features/tweet/tweetApi";
import tweetReducer from "./features/tweet/tweetSlice";
import { notificationApi } from "../redux/features/notification/notificationApi";
// import notificationReducer from "./features/notification/notificationSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tweet: tweetReducer, // Optional: if using tweetSlice
    // notification: notificationReducer,
    [authApi.reducerPath]: authApi.reducer,
    [tweetApi.reducerPath]: tweetApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(tweetApi.middleware)
      .concat(notificationApi.middleware),
});
