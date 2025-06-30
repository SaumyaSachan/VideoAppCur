import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  
  downloadedVideos: [],
  currentVideo: null,
  isLoading: false,
  error: null
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
    addDownloadedVideo: (state, action) => {
      const exists = state.downloadedVideos.find(video => video.id === action.payload.id);
      if (!exists) {
        state.downloadedVideos.push(action.payload);
      }
    },
    removeDownloadedVideo: (state, action) => {
      state.downloadedVideos = state.downloadedVideos.filter(
        video => video.id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setCurrentVideo,
  addDownloadedVideo,
  removeDownloadedVideo,
  setLoading,
  setError
} = videoSlice.actions;

export default videoSlice.reducer; 