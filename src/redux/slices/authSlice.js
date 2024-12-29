import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    access_token: null,
    token_type: 'bearer',
    expiresIn: null,
    user: null,
    isLogged: false,
  },
  reducers: {
    loginReducer: (state, action) => {
      state.expiresIn = action.payload.expires_in;
      state.access_token = action.payload.access_token;
      state.user = action.payload.user;
      state.isLogged = true;
    },
    registerUserReducer: (state, action) => {
      state.access_token = action.payload.access_token;
      state.expiresIn = action.payload.expiresIn;
      state.user = action.payload.data.user;
      state.isLogged = true;
    },
    meReducer: (state, action) => {
      state.access_token = action.payload.access_token;
      state.expiresIn = action.payload.expiresIn;
      state.user = action.payload.data.user;
      state.isLogged = true;
    },
    logoutReducer: (state, action) => {
      state.access_token = null;
      state.expiresIn = null;
      state.user = null;
      state.isLogged = false;
    }
  },
});

export const selectUser = state => state.auth.user; 
export const selectR = state => state.auth.user; 
export const selectIsLogged = state => state.auth.isLogged; 
export const selectAccessToken = state => state.auth.access_token; 
export const { loginReducer, registerUserReducer, meReducer, logoutReducer } = authSlice.actions;
export default authSlice.reducer;
