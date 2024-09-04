import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false, // Initial boolean state
  },
  reducers: {
    toggleAuth(state) {
      state.isAuthenticated = !state.isAuthenticated; // Toggle authentication state
    },
    setAuth(state, action) {
      state.isAuthenticated = action.payload; // Set authentication state based on action payload
    },
  },
});

export const { toggleAuth, setAuth } = authSlice.actions;
export default authSlice.reducer;
