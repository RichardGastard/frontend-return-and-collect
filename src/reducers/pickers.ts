import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  value: {
    pickerProfilName: string;
    pickerFromCapacity: string;
    pickerToCapacity: string;
  };
};

type PickerInfos = {
  pickerProfilName: string;
  pickerFromCapacity: string;
  pickerToCapacity: string;
};
const initialState: UserState = {
  value: {
    pickerProfilName: null,
    pickerFromCapacity: null,
    pickerToCapacity: null,
  },
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    pickerProfile: (state, action: PayloadAction<PickerInfos>) => {
      state.value.pickerProfilName = action.payload.pickerProfilName;
      state.value.pickerFromCapacity = action.payload.pickerFromCapacity;
      state.value.pickerToCapacity = action.payload.pickerToCapacity;
    },
  },
});

export const { pickerProfile } = userSlice.actions;

export default userSlice.reducer;
