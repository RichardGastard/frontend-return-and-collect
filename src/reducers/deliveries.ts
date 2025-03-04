import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";
import { LatitudeLongitude } from "@/utils/distance";

export type DeliveryState = {
  value: {
    isOngoing: boolean;
    deliveryId?: string | null;
    pickupAddress?: string | null;
    pickupPosition?: LatitudeLongitude;
    volume?: number | null;
    size?: string | null;
  };
};

export type DeliveryPayload = {
  deliveryId?: string;
  pickupAddress?: string;
  pickupPosition?: LatitudeLongitude;
  volume?: number;
  size?: string | null;
};

const initialState: DeliveryState = {
  value: {
    isOngoing: false,
    deliveryId: null,
    // Picker specific
    pickupAddress: null,
    pickupPosition: null,
    volume: null,
    size: null,
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
      if (action.payload.pickupPosition) {
        state.value.pickupPosition = action.payload.pickupPosition;
      }
      if (action.payload.volume) {
        state.value.volume = action.payload.volume;
      }
      if (action.payload.size) {
        state.value.size = action.payload.size;
      }
    },
    unloadDelivery: (state, action: PayloadAction<void>) => {
      state.value.isOngoing = false;
      state.value.deliveryId = null;
      state.value.pickupAddress = null;
      state.value.pickupPosition = null;
      state.value.volume = null;
      state.value.size = null;
    },
  },
});

export const { loadDelivery, unloadDelivery } = deliverySlice.actions;

export const selectDeliveryData = (state: RootState) => state.deliveries.value;

export default deliverySlice.reducer;
