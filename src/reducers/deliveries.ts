import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

export type DeliveryState = {
  value: {
    isOngoing: boolean;
    deliveryId?: string | null;
    pickupAddress?: string | null;
    volume?: string | null;
  };
};

export type DeliveryPayload = {
  deliveryId?: string;
  pickupAddress?: string;
  volume?: string;
};

const initialState: DeliveryState = {
  value: {
    isOngoing: false,
    deliveryId: null,
    // Picker specific
    pickupAddress: null,
  },
};

const deliverySlice = createSlice({
  name: "deliveries",
  initialState,
  reducers: {
    loadDelivery: (state, action: PayloadAction<DeliveryPayload>) => {
      state.value.isOngoing = true;
      if (action.payload.deliveryId) {
        state.value.deliveryId = action.payload.deliveryId;
      }
      if (action.payload.pickupAddress) {
        state.value.pickupAddress = action.payload.pickupAddress;
      }
      if (action.payload.volume) {
        state.value.volume = action.payload.volume;
      }
    },
    unloadDelivery: (state, action: PayloadAction<void>) => {
      state.value.isOngoing = false;
      state.value.deliveryId = null;
      state.value.pickupAddress = null;
      state.value.volume = null;
    },
  },
});

export const { loadDelivery, unloadDelivery } = deliverySlice.actions;

export const selectDeliveryData = (state: RootState) => state.deliveries.value;

export default deliverySlice.reducer;
