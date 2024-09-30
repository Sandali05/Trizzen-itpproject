import { useContext } from "react";
import { ItemContext, ItemContextType } from "../context/itemContext";


export const useItem = (): ItemContextType => {
    const context = useContext(ItemContext);
    if (context === undefined) {
      throw new Error('useItem must be used within an ItemProvider');
    }
    return context;
  };