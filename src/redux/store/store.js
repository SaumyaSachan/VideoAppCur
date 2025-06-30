import { configureStore } from '@reduxjs/toolkit';
import videoSlice from '../slice/videoSlice';
import videoDownloadSlice from '../slice/videoDownloadSlice';
import userReducer from '../slice/userSlice';

const store = configureStore({
  reducer: {
    video: videoSlice,
    videoDownload: videoDownloadSlice,
    user: userReducer,
  },
});

export default store;