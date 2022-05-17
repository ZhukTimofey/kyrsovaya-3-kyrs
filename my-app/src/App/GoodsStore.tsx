import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Good, UserStore } from "../types/types";
import axios from "axios";

export const getGoods = createAsyncThunk("api/goods", async () => {
  const resp = await axios.get("api/goods");
  return resp.data;
});
export const getProduct = createAsyncThunk(
  "api/goods/id",
  async (id: string) => {
    const resp = await axios.get(`/api/goods/${id}`);
    return resp.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "api/goods/delete",
  async (id: string) => {
    const resp = await axios.delete(`/api/goods/${id}`);
    return resp.data;
  }
);
export const editProduct = createAsyncThunk(
  "api/goods/edit",
  async (data: {
    title: string;
    excerpt: string;
    price: number;
    img: string;
    id: string;
  }) => {
    const resp = await axios.put(`/api/goods`, data);
    return resp.data;
  }
);
export const requestForBuying = createAsyncThunk(
  "api/goods/",
  async (data: { id: string; buyer: UserStore; message: string }) => {
    const body = {
      ...data,
      buyer: { ...data.buyer, message: data.message },
    };
    const resp = await axios.put(`/api/goods/buyers`, body);
    return resp;
  }
);

export const confirmBuying = createAsyncThunk(
  "api/goods/buy",
  async ({ id, userID }: { id: string; userID: string }) => {
    const body = { id, userID, status: "SOLD" };
    const resp = await axios.put(`/api/goods/buying`, body);
    return resp;
  }
);

interface GoodsStoreState {
  goods: Good[];
  product?: Good;
  isEdited: boolean;
  isDeleted: boolean;
  isBought: boolean;
  isRequested: boolean;
  productStatus: "rejected" | "fulfilled" | "pending";
  loading: boolean;
  errors: null | {};
}

const initialState: GoodsStoreState = {
  goods: [],
  product: undefined,
  productStatus: "pending",
  isEdited: false,
  isDeleted: false,
  isBought: false,
  isRequested: false,
  loading: false,
  errors: null,
};

export const goodsStoreSlice = createSlice({
  name: "goodsStore",
  initialState,
  reducers: {
    setGoodsInitState: (state) => {
      state.productStatus = "pending";
      state.product = undefined;
    },
    setIsRequested: (state) => {
      state.isRequested = false;
    },
    setIsDeleted: (state) => {
      state.isDeleted = false;
    },
    setIsBought: (state) => {
      state.isBought = false;
    },
    setIsEdited: (state) => {
      state.isEdited = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGoods.fulfilled, (state, action) => {
      state.goods = action.payload;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload;
      state.productStatus = "fulfilled";
    });
    builder.addCase(getProduct.pending, (state, action) => {
      state.productStatus = "pending";
    });
    builder.addCase(requestForBuying.fulfilled, (state, action) => {
      state.isRequested = true;
    });
    builder.addCase(editProduct.fulfilled, (state, action) => {
      state.isEdited = true;
    });
    builder.addCase(confirmBuying.fulfilled, (state, action) => {
      state.isBought = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.isBought = true;
    });
  },
});

export const {
  setGoodsInitState,
  setIsRequested,
  setIsDeleted,
  setIsBought,
  setIsEdited,
} = goodsStoreSlice.actions;

export default goodsStoreSlice.reducer;
