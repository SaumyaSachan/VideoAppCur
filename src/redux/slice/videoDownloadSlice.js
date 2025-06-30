import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  downloadedVideos: [],
  isLoading: false,
  error: null
};

const videoDownloadSlice = createSlice({
  name: 'videoDownload',
  initialState,
  reducers: {
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
  addDownloadedVideo,
  removeDownloadedVideo,
  setLoading,
  setError
} = videoDownloadSlice.actions;

export const selectDownloadedVideos = (state) => state.videoDownload.downloadedVideos;
export const selectIsLoading = (state) => state.videoDownload.isLoading;
export const selectError = (state) => state.videoDownload.error;

export default videoDownloadSlice.reducer; 