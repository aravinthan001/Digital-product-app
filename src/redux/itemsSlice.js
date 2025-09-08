// src/redux/itemsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // This will hold our list of products/items
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // This is an "action" that will let us add an item to the list
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    // You can add other actions here later, like removeItem, updateItem, etc.
  },
});

// Export the action so we can use it in our components
export const { addItem } = itemsSlice.actions;

// Export the reducer so the store can use it
export default itemsSlice.reducer;
