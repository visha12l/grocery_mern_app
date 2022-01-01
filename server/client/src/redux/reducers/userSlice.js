import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: { user: {} },
  reducers: {
    loginUser: (state, action) => {
      return { ...state, user: { ...action.payload } };
    },
    logoutUser: state => {
      return { ...state, user: {} };
    },
    setUserCart: (state, action) => {
      return { ...state, user: { ...state.user, cart: [...action.payload] } };
    }
  }
});

export const { loginUser, logoutUser, setUserCart } = userSlice.actions;

export default userSlice.reducer;
