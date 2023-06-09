import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: { entities: [], tree: {}, slugToId: {} },
  reducers: {
    preload: (state, { payload }) => {
      state.entities = payload.filter((item) => item.count > 0);

      const tree = state.entities
        .filter((item) => item.parent === 0)
        .reduce((acc, item) => {
          acc[item.id] = {
            ...item,
            link: item.link.replace(process.env.SITE_BASE_URL, ""),
            childs: {},
          };
          return acc;
        }, {});

      state.entities
        .filter((item) => item.parent !== 0)
        .forEach((item) => {
          if (item.parent && tree[item.parent]) {
            tree[item.parent].childs[item.id] = {
              ...item,
              link: item.link.replace(process.env.SITE_BASE_URL, ""),
            };
          }
        });
      state.tree = tree;
    },
  },
});

export const { preload } = categorySlice.actions;
