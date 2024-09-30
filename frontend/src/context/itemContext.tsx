import React, { createContext, useState, ReactNode, useEffect } from "react";
import itemsData from "../data/items.json";

export interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface ItemContextType {
  items: Item[];
  addItem: (item: Item) => void;
  updateItem: (id: string, item: Item) => void;
  deleteItem: (id: string) => void;
  getItem: (id: string) => Item | undefined;
}

export const ItemContext = createContext<ItemContextType | undefined>(
  undefined
);

export const ItemProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Item[]>(itemsData);

  const addItem = (item: Item) => {
    setItems([...items, item]);
  };

  const updateItem = (id: string, updatedItem: Item) => {
    setItems(items.map((item) => (item._id === id ? updatedItem : item)));
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item._id !== id));
  };

  const getItem = (id: string) => {
    return items.find((item) => item._id === id);
  };

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <ItemContext.Provider
      value={{ items, addItem, updateItem, deleteItem, getItem }}
    >
      {children}
    </ItemContext.Provider>
  );
};
