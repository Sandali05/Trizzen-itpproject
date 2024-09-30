import axios from "axios";
import { createContext, useState, ReactNode, useEffect } from "react";
import { useAdminAuth } from "../hooks/useAdminAuth";

export interface Order {
  _id: string;
  name: string;
  address: string;
  mobile: string;
  totalAmount: number;
  user: string;
  items: string[];
  status: string;
  assignedDriver: string;
}

export interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => Promise<boolean>;
  updateOrder: (order: Order) => Promise<boolean>;
  deleteOrder: (id: string) => Promise<boolean>;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { token } = useAdminAuth();

  const addOrder = async (order: Order) => {
    return await axios
      .post("http://localhost:3000/api/auth/place-order", order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("response", response);
        setOrders([...orders, { ...order, _id: response.data.order._id }]);
        return true;
      })
      .catch((error) => {
        console.error("Error adding order:", error);
        return false;
      });
  };

  const updateOrder = async (updatedOrder: Order) => {
    const { _id, ...orderData } = updatedOrder;
    return await axios
      .put(
        `http://localhost:3000/api/auth/order/${updatedOrder._id}/status`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setOrders(
          orders.map((order) =>
            order._id === updatedOrder._id ? updatedOrder : order
          )
        );
        return true;
      })
      .catch((error) => {
        console.error("Error updating order:", error);
        return false;
      });
  };

  const deleteOrder = async (id: string) => {
    return await axios
      .delete(`http://localhost:3000/api/auth/order/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setOrders(orders.filter((order) => order._id !== id));
        return true;
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
        return false;
      });
  };

  const getOrders = () => {
    axios
      .get("http://localhost:3000/api/auth/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setOrders(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error getting orders:", error);
      });
  };

  useEffect(() => {
    if (token) {
      getOrders();
    }
  }, [token]);

  useEffect(() => {
    console.log("orders", orders);
  }, [orders]);

  return (
    <OrderContext.Provider
      value={{ orders, addOrder, updateOrder, deleteOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext };
