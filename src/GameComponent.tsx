import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "./merchandiseSlice";
import { AppDispatch, RootState } from "./store";
import { Select, MenuItem, Button, Typography } from "@mui/material";
import { Item } from "./state";

const GameComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const [selectedItem, setSelectedItem] = useState("");
  const [searchTimer, setSearchTimer] = useState<number | null>(null);
  const [saleTimer, setSaleTimer] = useState<number | null>(null);
  const searchStartTime = useRef<number | null>(null);
  const saleStartTime = useRef<number | null>(null);
  const requestRef = useRef<number>();

  const items = useSelector(
    (state: RootState) => state.merchandise.items
  ) as Item[];

  const itemsRef = useRef<Item[]>([]);

  const [money, setMoney] = useState(0);

  const handleItemChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedItem(event.target.value as string);
  };

  const handleAddItem = () => {
    const newItem = {
      id: Math.random().toString(), // Generating a random id for the sake of this example
      name: selectedItem || "NewItem", // Using the selected item's name or default to "NewItem"
      type: selectedItem || "WAND",
      price: 10,
      stock: 1,
    };
    dispatch(addItem(newItem));
  };

  useEffect(() => {
    // If there are items available and the sale timer isn't already running, start it
    if (items.length > 0 && saleTimer === null) {
      setSaleTimer(5000);
      saleStartTime.current = performance.now();
      requestRef.current = requestAnimationFrame(animateSale);
    }
  }, [items]);

  const startSearch = () => {
    if (searchTimer === null) {
      setSearchTimer(5000);
      searchStartTime.current = performance.now();
      requestRef.current = requestAnimationFrame(animateSearch);
    }
  };

  const animateSearch = (time: number) => {
    if (!searchStartTime.current) return;
    const elapsed = time - searchStartTime.current;

    if (elapsed >= 5000) {
      console.log("Search complete!");
      const newItem = {
        id: Math.random().toString(),
        name: selectedItem || "NewItem",
        type: selectedItem || "WAND",
        price: 10,
        stock: 1,
      };
      dispatch(addItem(newItem));
      setSearchTimer(null);
    } else {
      setSearchTimer(5000 - elapsed);
      requestRef.current = requestAnimationFrame(animateSearch);
    }
  };

  itemsRef.current = items;

  const animateSale = (time: number) => {
    if (!saleStartTime.current) return;
    const elapsed = time - saleStartTime.current;

    if (elapsed >= 5000) {
      console.log("Item sold!");
      if (itemsRef.current.length > 0) {
        const soldItem = itemsRef.current[itemsRef.current.length - 1];
        setMoney((prevMoney) => prevMoney + soldItem.price);
        dispatch(removeItem(soldItem.id));
      } else {
        console.warn("No items to sell!");
      }
      setSaleTimer(null);
    } else {
      setSaleTimer(5000 - elapsed);
      requestRef.current = requestAnimationFrame(animateSale);
    }
  };

  return (
    <div>
      <Typography variant="h4">Idle Shop Game</Typography>

      <Select
        value={selectedItem}
        onChange={handleItemChange as any}
        displayEmpty
      >
        {" "}
        {/* <- Cast to 'any' to resolve the type error, but ideally, find the correct type */}
        <MenuItem value="" disabled>
          Select Item
        </MenuItem>
        <MenuItem value="WAND">Wand</MenuItem>
        <MenuItem value="SLING">Sling</MenuItem>
        <MenuItem value="SWORD">Sword</MenuItem>
      </Select>
      <Button
        variant="contained"
        color="primary"
        onClick={startSearch}
        disabled={searchTimer !== null}
      >
        Start Search
      </Button>

      {searchTimer && (
        <Typography>
          Search Time left: {(searchTimer / 1000).toFixed(2)} seconds
        </Typography>
      )}
      {saleTimer && (
        <Typography>
          Sale Time left: {(saleTimer / 1000).toFixed(2)} seconds
        </Typography>
      )}

      <h2>Items:</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>

      <h2>Money: ${money}</h2>
    </div>
  );
};

export default GameComponent;
