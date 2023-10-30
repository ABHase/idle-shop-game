// merchandiseSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
  id: string;
  name: string;
  type: string; // 'WAND', 'SLING', 'SWORD'
  price: number;
  stock: number; // How many of these items you have
}

interface GameEvent {
  id: number;
  type: "SEARCH_FOR_STICK" | "SELL_ITEM";
  scheduledTime: Date;
  item?: Item; // Only relevant for 'SELL_ITEM' event
}

interface GameState {
  items: Item[];
  events: GameEvent[];
  money: number;
}

const initialState: GameState = {
  items: [],
  events: [],
  money: 0,
};

export const removeItem = createAsyncThunk(
  "merchandise/removeItem",
  async (itemId: string) => {
    // If there's any async operation, perform here.
    return itemId;
  }
);

const merchandiseSlice = createSlice({
  name: "merchandise",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    scheduleEvent: (state, action: PayloadAction<GameEvent>) => {
      state.events.push(action.payload);
    },
    processEvent: (state, action: PayloadAction<{ eventId: number }>) => {
      const eventIndex = state.events.findIndex(
        (event) => event.id === action.payload.eventId
      );
      if (
        eventIndex !== -1 &&
        state.events[eventIndex].type === "SEARCH_FOR_STICK"
      ) {
        state.items.push({
          id: "stick",
          name: "Stick",
          type: "BASIC",
          price: 0,
          stock: 1,
        });
        state.events.splice(eventIndex, 1);
      }
    },
    // ... other reducers
  },
  extraReducers: (builder) => {
    builder.addCase(removeItem.fulfilled, (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    });
  },
});

export const { addItem, scheduleEvent, processEvent } =
  merchandiseSlice.actions;
export default merchandiseSlice.reducer;
