import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
  value: {
    email: string | null;
    password: string | null;
  };
};

const initialState: UserState = {
  value: { email: null, password : null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.value.email = action.payload;
      state.value.password= action.payload;
    },
   
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
