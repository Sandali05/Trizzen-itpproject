import axios from "axios";
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { useAdminAuth } from "../hooks/useAdminAuth";

export interface Customer {
  _id: number;
  username: string;
  mobilenumber: string;
  firstname: string;
  lastname: string;
  role: string;
  address: string;
  email: string;
  password: string;
}

export interface CustomerContextType {
  customers: Customer[];
  addCustomer: (customer: Customer) => Promise<boolean>;
  getCustomers: () => Customer[];
  updateCustomer: (customer: Customer) => Promise<boolean>;
  deleteCustomer: (id: number) => Promise<boolean>;
}

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { token } = useAdminAuth();

  const addCustomer = async (customer: Customer) => {
    return await axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        customer,
      )
      .then(() => {
        setCustomers([
          ...customers,
          { ...customer, _id: customers.length + 1 },
        ]);
        return true;
      })
      .catch((error) => {
        console.error("Error adding customer:", error);
        return false;
      });
  };

  const getCustomers = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/auth/users`)
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
    return customers;
  }, [customers]);

  const updateCustomer = async (updatedCustomer: Customer) => {
    return await axios
      .put(
        `${import.meta.env.VITE_API_URL}/api/auth/admin-profile-update`,
        {
          ...updatedCustomer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setCustomers(
          customers.map((customer) =>
            customer._id === updatedCustomer._id ? updatedCustomer : customer
          )
        );
        return true;
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
        return false;
      });
  };

  const deleteCustomer = async (id: number) => {
    return await axios
      .delete(`${import.meta.env.VITE_API_URL}/api/auth/admin-profile-delete`, {
        data: { id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setCustomers(customers.filter((customer) => customer._id !== id));
        return true;
      })
      .catch((error) => {
        console.error("Error deleting customer:", error);
        return false;
      });
  };

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    console.log("Customers", customers);
  }, [customers]);

  return (
    <CustomerContext.Provider
      value={{
        customers,
        addCustomer,
        getCustomers,
        updateCustomer,
        deleteCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext };
