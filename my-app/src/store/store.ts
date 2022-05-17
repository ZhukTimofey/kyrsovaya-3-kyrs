import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userStoreReducer from "../App/UserStore";
import goodsStoreReducer from "../App/GoodsStore";

export const store = configureStore({
  reducer: { userStore: userStoreReducer, goodsStore: goodsStoreReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
