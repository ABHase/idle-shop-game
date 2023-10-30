// actions.ts

import { GameEvent, Item } from "./state";

export interface AddItemAction {
  type: "ADD_ITEM";
  payload: Item;
}

export interface ScheduleEventAction {
  type: "SCHEDULE_EVENT";
  payload: GameEvent;
}

export interface ProcessEventAction {
  type: "PROCESS_EVENT";
  payload: { eventId: number };
}

// ... other actions like 'SELL_ITEM', etc.
