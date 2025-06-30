import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';
const PROFILE_IMAGE_KEY = 'profileImage';
const HAS_SELECTED_GENRES_KEY = 'hasSelectedGenres';

export const saveUserToAsyncStorage = createAsyncThunk(
  'user/saveUserToAsyncStorage',
  async (user, { dispatch }) => {
    let users = [];
    const usersStr = await AsyncStorage.getItem(USERS_KEY);
    if (usersStr) {
      users = JSON.parse(usersStr);
    }
    users.push(user);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    dispatch(setCurrentUser(user));
    dispatch(setUsers(users));
    return user;
  }
);

export const loadUserFromAsyncStorage = createAsyncThunk(
  'user/loadUserFromAsyncStorage',
  async (_, { dispatch }) => {
    const userStr = await AsyncStorage.getItem(CURRENT_USER_KEY);
    if (userStr) {
      const user = JSON.parse(userStr);
      dispatch(setCurrentUser(user));
      return user;
    }
    return null;
  }
);

export const saveProfileImageToAsyncStorage = createAsyncThunk(
  'user/saveProfileImageToAsyncStorage',
  async (imageUri, { dispatch }) => {
    await AsyncStorage.setItem(PROFILE_IMAGE_KEY, imageUri);
    dispatch(setProfileImage(imageUri));
    // Also update current user in AsyncStorage
    const userStr = await AsyncStorage.getItem(CURRENT_USER_KEY);
    if (userStr) {
      const user = JSON.parse(userStr);
      user.profileImage = imageUri;
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      dispatch(setCurrentUser(user));
    }
    return imageUri;
  }
);

export const loadProfileImageFromAsyncStorage = createAsyncThunk(
  'user/loadProfileImageFromAsyncStorage',
  async (_, { dispatch }) => {
    const imageUri = await AsyncStorage.getItem(PROFILE_IMAGE_KEY);
    if (imageUri) {
      dispatch(setProfileImage(imageUri));
      return imageUri;
    }
    return null;
  }
);

export const setHasSelectedGenres = createAsyncThunk(
  'user/setHasSelectedGenres',
  async (value, { dispatch }) => {
    await AsyncStorage.setItem(HAS_SELECTED_GENRES_KEY, JSON.stringify(value));
    dispatch(_setHasSelectedGenres(value));
    return value;
  }
);

export const loadHasSelectedGenres = createAsyncThunk(
  'user/loadHasSelectedGenres',
  async (_, { dispatch }) => {
    const value = await AsyncStorage.getItem(HAS_SELECTED_GENRES_KEY);
    const parsed = value ? JSON.parse(value) : false;
    dispatch(_setHasSelectedGenres(parsed));
    return parsed;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    currentUser: null,
    profileImage: null,
    hasSelectedGenres: false,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
      if (state.currentUser) {
        state.currentUser.profileImage = action.payload;
      }
    },
    updateUser: (state, action) => {
      const idx = state.users.findIndex(u => u.email === action.payload.email);
      if (idx !== -1) {
        state.users[idx] = { ...state.users[idx], ...action.payload };
      }
      if (state.currentUser && state.currentUser.email === action.payload.email) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    _setHasSelectedGenres: (state, action) => {
      state.hasSelectedGenres = action.payload;
    },
  },
});

export const { setUsers, setCurrentUser, setProfileImage, updateUser, _setHasSelectedGenres } = userSlice.actions;
export default userSlice.reducer; 