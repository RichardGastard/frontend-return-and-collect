import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/store/store";

export type ReviewState = {
  value: {
    deliveryId: string | null;
    rating: Boolean;
    pickerId: string | null;
  };
};

const initialState: ReviewState = {
  value: {
    deliveryId: null,
    rating: null,
    pickerId: null,
  },
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviewDeliveryId: (state, action: PayloadAction<string>) => {
      state.value.deliveryId = action.payload;
    },
    resetReviewData: (state, action: PayloadAction<void>) => {
      state.value.deliveryId = null;
    },
  },
});

export const { setReviewDeliveryId, resetReviewData } =
  reviewSlice.actions;

export const selectReviewData = (state: RootState) => state.reviews.value;

export default reviewSlice.reducer;
