// state.ts

export interface Item {
  id: string;
  name: string;
  type: string; // 'WAND', 'SLING', 'SWORD'
  price: number;
  stock: number; // How many of these items you have
}

export interface GameEvent {
  id: number;
  type: "SEARCH_FOR_STICK" | "SELL_ITEM";
  scheduledTime: Date;
  item?: Item; // Only relevant for 'SELL_ITEM' event
}

export interface GameState {
  items: Item[];
  events: GameEvent[];
  money: number;
}

export const initialState: GameState = {
  items: [],
  events: [],
  money: 0,
};
