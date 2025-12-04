// src/redux/features/tweet/tweetApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tweetApi = createApi({
  reducerPath: "tweetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/tweet",
    credentials: "include",
  }),
  tagTypes: ["Tweet"],
  endpoints: (builder) => ({
    // Create Tweet
    createTweet: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tweet"],
    }),

    // Get All Tweets
    getAllTweets: builder.query({
      query: () => "/",
      providesTags: ["Tweet"],
    }),

    // Like / Unlike Tweet
    likeTweet: builder.mutation({
      query: ({ tweetId, userId }) => ({
        url: `/${tweetId}/like`,
        method: "POST",
        body: { userId },
      }),
      invalidatesTags: ["Tweet"],
    }),

    // Reply to Tweet
    replyToTweet: builder.mutation({
      query: ({ tweetId, userId, content }) => ({
        url: `/${tweetId}/reply`,
        method: "POST",
        body: { userId, content },
      }),
      invalidatesTags: ["Tweet"],
    }),

    // Delete Tweet
    deleteTweet: builder.mutation({
      query: (tweetId) => ({
        url: `/${tweetId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tweet"],
    }),
  }),
});

export const {
  useCreateTweetMutation,
  useGetAllTweetsQuery,
  useLikeTweetMutation,
  useReplyToTweetMutation,
  useDeleteTweetMutation,
} = tweetApi;
