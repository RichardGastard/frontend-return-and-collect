// LE REDUCER N'EST PAS UTILE

{
  /*
  import { createSlice, PayloadAction } from "@reduxjs/toolkit";
  import PickerActivityScreen from "screens/PickerActivityScreen";
  
  export type UserState = {
    value: {
      pickerProfilName: string;
      pickerFromCapacity: string;
      pickerToCapacity: string;
      pickerAvailabilty: boolean;
    };
  };
  
  type PickerInfos = {
    pickerProfilName: string;
    pickerFromCapacity: string;
    pickerToCapacity: string;
    pickerAvailability: boolean;
  };
  const initialState: UserState = {
    value: {
      pickerProfilName: null,
      pickerFromCapacity: null,
      pickerToCapacity: null,
      pickerAvailabilty: false,
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
        state.value.pickerAvailabilty = action.payload.pickerAvailability;
      },
      updatePickerAvailability: (state, action: PayloadAction<PickerInfos>) => {
        if (!state.value.pickerAvailabilty) {
          state.value.pickerAvailabilty = true;
        } else {
          state.value.pickerAvailabilty = false;
        }
      },
    },
  });
  
  export const { pickerProfile, updatePickerAvailability } = userSlice.actions;
  
  export default userSlice.reducer;
  */
}
