import axios from "axios";
import { createContext, useState, ReactNode, useEffect, useCallback } from "react";
import { useAdminAuth } from "../hooks/useAdminAuth";

export interface Delivery {
  _id?: string;
  name: string;
  address: string;
  mobile: string;
  vehicleId: string;
  category: string;
  orderStatus: string;
  assignedOrders?: string[];
}

export interface DeliveryContextType {
  deliveries: Delivery[];
  addDelivery: (delivery: Delivery) => Promise<boolean>;
  updateDelivery: (delivery: Delivery) => Promise<boolean>;
  deleteDelivery: (id: string | undefined) => Promise<boolean>;
  getDeliveryName: (driverId: string) => string;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(
  undefined
);

export const DeliveryProvider = ({ children }: { children: ReactNode }) => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const { token } = useAdminAuth();

  const addDelivery = async (delivery: Delivery) => {
    return await axios
      .post("http://localhost:3000/api/auth/add/drivers", delivery, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setDeliveries([...deliveries, response.data]);
        return true;
      })
      .catch((error) => {
        console.error("Error adding delivery:", error);
        return false;
      });
  };

  const updateDelivery = async (updatedDelivery: Delivery) => {
    return await axios
      .put(
        `http://localhost:3000/api/auth/drivers/${updatedDelivery._id}`,
        updatedDelivery,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setDeliveries(
          deliveries.map((delivery) =>
            delivery._id === updatedDelivery._id ? updatedDelivery : delivery
          )
        );
        return true;
      })
      .catch((error) => {
        console.error("Error updating delivery:", error);
        return false;
      });
  };

  const getDeliveries = async () => {
    const response = await axios.get("http://localhost:3000/api/auth/drivers");
    setDeliveries(response.data);
  };

  const deleteDelivery = async (id: string | undefined) => {
    return await axios
      .delete(`http://localhost:3000/api/auth/drivers/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setDeliveries(deliveries.filter((delivery) => delivery._id !== id));
        return true;
      })
      .catch((error) => {
        console.error("Error deleting delivery:", error);
        return false;
      });
  };

  const getDeliveryName = useCallback(
    (driverId: string) => {
      const driver = deliveries.find((d) => d._id === driverId);
      return driver ? driver.name : "Unassigned";
    },
    [deliveries]
  );

  useEffect(() => {
    console.log("Deliveries:", deliveries);
  }, [deliveries]);

  useEffect(() => {
    getDeliveries();
  }, []);

  return (
    <DeliveryContext.Provider
      value={{ deliveries, addDelivery, updateDelivery, deleteDelivery, getDeliveryName }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

export { DeliveryContext };
