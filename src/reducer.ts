import {
  AddItemAction,
  ScheduleEventAction,
  ProcessEventAction,
} from "./actions"; // removed the .ts extension
import { GameState, initialState } from "./state";

export const gameReducer = (state = initialState, action: any): GameState => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };

    case "SCHEDULE_EVENT":
      return { ...state, events: [...state.events, action.payload] };

    case "PROCESS_EVENT":
      // Handle the logic for processing the event, e.g., adding the stick to items
      const eventToProcess = state.events.find(
        (event) => event.id === action.payload.eventId
      );
      if (eventToProcess && eventToProcess.type === "SEARCH_FOR_STICK") {
        const newItems = [
          ...state.items,
          { id: "stick", name: "Stick", type: "BASIC", price: 0, stock: 1 },
        ];
        const updatedEvents = state.events.filter(
          (event) => event.id !== action.payload.eventId
        );
        return { ...state, items: newItems, events: updatedEvents };
      }
      return state;

    // ... other cases

    default:
      return state;
  }
};
