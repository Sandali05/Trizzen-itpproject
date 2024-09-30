import { useContext } from "react";
import { OrderContext, OrderContextType } from "../context/orderContext";

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
