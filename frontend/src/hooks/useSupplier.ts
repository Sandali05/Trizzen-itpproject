import { useContext } from "react";
import {
  SupplierContextType,
  SupplierContext,
} from "../context/supplierContext";

export const useSupplier = (): SupplierContextType => {
  const context = useContext(SupplierContext);
  if (!context) {
    throw new Error("useSupplier must be used within a SupplierProvider");
  }
  return context;
};
