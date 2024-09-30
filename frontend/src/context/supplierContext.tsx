import axios from "axios";
import { createContext, useState, ReactNode, useEffect } from "react";
import { useAdminAuth } from "../hooks/useAdminAuth";

export interface Supplier {
  _id: string;
  name: string;
  address: string;
  mobile: string;
  itemId: string;
  email: string;
  company: string;
}

export interface SupplierContextType {
  suppliers: Supplier[];
  addSupplier: (supplier: Supplier) => Promise<boolean>;
  updateSupplier: (supplier: Supplier) => Promise<boolean>;
  deleteSupplier: (id: string) => Promise<boolean>;
}

const SupplierContext = createContext<SupplierContextType | undefined>(
  undefined
);

export const SupplierProvider = ({ children }: { children: ReactNode }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const { token } = useAdminAuth();

  const addSupplier = async (supplier: Supplier) => {
    const { _id, ...supplierData } = supplier;
    return await axios
      .post("http://localhost:3000/api/auth/add/suppliers", supplierData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setSuppliers([
          ...suppliers,
          { ...supplier },
        ]);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  const updateSupplier = async (updatedSupplier: Supplier) => {
    return await axios
      .put(
        `http://localhost:3000/api/auth/suppliers/${updatedSupplier._id}`,
        updatedSupplier,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setSuppliers(
          suppliers.map((supplier) =>
            supplier._id === updatedSupplier._id ? updatedSupplier : supplier
          )
        );
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  const deleteSupplier = async (id: string) => {
    return await axios
      .delete(`http://localhost:3000/api/auth/suppliers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setSuppliers(suppliers.filter((supplier) => supplier._id !== id));
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  const getSuppliers = async () => {
    return await axios
      .get("http://localhost:3000/api/auth/suppliers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  useEffect(() => {
    if (token) {
      getSuppliers();
    } else {
      console.log("No token");
    }
  }, [token]);

  useEffect(() => {
    console.log("suppliers", suppliers);
  }, [suppliers]);

  return (
    <SupplierContext.Provider
      value={{ suppliers, addSupplier, updateSupplier, deleteSupplier }}
    >
      {children}
    </SupplierContext.Provider>
  );
};

export { SupplierContext };
