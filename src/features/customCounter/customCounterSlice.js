import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const sleep = (msec) => {
  const start = new Date();
  while (new Date() - start < msec);
};

export const fetchDummy = createAsyncThunk("fetch/dummy", async (num) => {
  await sleep(2000);
  return num;
});

export const fetchJSON = createAsyncThunk("fetch/api", async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/users/1");
  const { username } = res.data;
  return username;
});

export const customCounterSlice = createSlice({
  name: "customCounter",
  initialState: {
    mode: 0,
    value: 0,
    username: "",
  },
  reducers: {
    increment: (state) => {
      switch (state.mode) {
        case 0:
          state.value += 1;
          break;
        case 1:
          state.value += 100;
          break;
        case 2:
          state.value += 10000;
          break;
        default:
          break;
      }
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      switch (state.mode) {
        case 0:
          state.value += action.payload;
          break;
        case 1:
          state.value += 100 * action.payload;
          break;
        case 2:
          state.value += 10000 * action.payload;
          break;
        default:
          break;
      }
    },
  },
  //非同期関数(fetchDummy, fetchJSON)の後処理
  extraReducers: (builder) => {
    //fetchDummyが正常終了した場合の処理
    builder.addCase(fetchDummy.fulfilled, (state, action) => {
      state.value = 100 + action.payload;
    });
    //fetchDummyが異常終了した場合の処理
    builder.addCase(fetchDummy.rejected, (state, action) => {
      state.value = 100 - action.payload;
    });
    builder.addCase(fetchJSON.fulfilled, (state, action) => {
      state.username = action.payload;
    });
    builder.addCase(fetchJSON.rejected, (state, action) => {
      state.username = "anonymous";
    });
  },
});

// reducerをReactコンポーネントで利用できるようにexport
export const {
  increment,
  decrement,
  incrementByAmount,
} = customCounterSlice.actions;

// ReactコンポーネントからuseSelectを使用してstore stateの中のcustomCounterスライスのvalueを参照するための関数
export const selectCount = (state) => state.customCounter.value;
export const selectUsername = (state) => state.customCounter.username;
// sliceのreducerはstoreに追加する必要があるのでexport⇒app/store.js
export default customCounterSlice.reducer;
