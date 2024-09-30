import { useContext } from "react";
import { CustomerContext, CustomerContextType } from "../context/customerContext";

export const useCustomer = (): CustomerContextType => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
};
