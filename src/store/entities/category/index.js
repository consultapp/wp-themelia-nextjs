import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: { entities: [], tree: {} },
  reducers: {
    preload: (state, { payload }) => {
      // console.log("payload", payload);
      state.entities = payload.filter((item) => item.count > 0);
      const tree = state.entities
        .filter((item) => item.parent === 0)
        .reduce((acc, item) => {
          acc[item.id] = { ...item, childs: {} };
          return acc;
        }, {});

      state.entities
        .filter((item) => item.parent !== 0)
        .forEach((item) => {
          if (item.parent && tree[item.parent]) {
            tree[item.parent].childs[item.id] = item;
          }
        });
      state.tree = tree;
    },
  },
});

export const { preload } = categorySlice.actions;
