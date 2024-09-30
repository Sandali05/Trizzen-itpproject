import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NewsFeedProvider } from "./context/newsFeedContext.tsx";
import { CustomerProvider } from "./context/customerContext.tsx";
import { FeedbackProvider } from "./context/feedbackContext.tsx";
import { DeliveryProvider } from "./context/deliveryContext.tsx";
import { SupplierProvider } from "./context/supplierContext.tsx";
import { AdminAuthProvider } from "./context/adminAuthContext.tsx";
import { OrderProvider } from "./context/orderContext.tsx";
import App from "./App.tsx";
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { ItemProvider } from "./context/itemContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <ItemProvider>
          <NewsFeedProvider>
            <CustomerProvider>
              <FeedbackProvider>
                <DeliveryProvider>
                  <SupplierProvider>
                    <OrderProvider>
                      <App />
                    </OrderProvider>
                  </SupplierProvider>
                </DeliveryProvider>
              </FeedbackProvider>
            </CustomerProvider>
          </NewsFeedProvider>
        </ItemProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
