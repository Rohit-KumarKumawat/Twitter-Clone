// src/redux/features/tweet/tweetSlice.js
import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
  name: "tweet",
  initialState: {
    selectedTweet: null,
  },
  reducers: {
    setSelectedTweet: (state, action) => {
      state.selectedTweet = action.payload;
    },
    clearSelectedTweet: (state) => {
      state.selectedTweet = null;
    },
  },
});

export const { setSelectedTweet, clearSelectedTweet } = tweetSlice.actions;
export default tweetSlice.reducer;
