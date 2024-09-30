import { useContext } from "react";
import {
  DeliveryContext,
  DeliveryContextType,
} from "../context/deliveryContext";

export const useDelivery = (): DeliveryContextType => {
  const context = useContext(DeliveryContext);
  if (!context) {
    throw new Error("useDelivery must be used within a DeliveryProvider");
  }
  return context;
};
