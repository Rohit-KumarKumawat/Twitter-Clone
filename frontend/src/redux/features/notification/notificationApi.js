import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/notifications", // backend base URL
    credentials: "include", // if you use cookies
  }),
  tagTypes: ["Notification"],
  endpoints: (builder) => ({
    // Fetch all notifications for a user
    getNotifications: builder.query({
      query: (userId) => `/${userId}`,
      providesTags: ["Notification"],
    }),

    // Mark a notification as read
    // markAsRead: builder.mutation({
    //   query: (notifId) => ({
    //     url: `/notifications/${notifId}/read`,
    //     method: "PATCH",
    //   }),
    //   invalidatesTags: ["Notification"],
    // }),
  }),
});

export const {
  useGetNotificationsQuery,
  // useMarkAsReadMutation,
} = notificationApi;
