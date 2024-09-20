import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import { StoreProvider } from "./context/StoreContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { AppDataProvider } from "./context/AppDataContext.tsx";
import { FontProvider } from "./context/FontContext.tsx";
import { CategoryProvider } from "./context/CategoryContext.tsx";
import { ProductProvider } from "./context/ProductContext.tsx";
import { ServiceProvider } from "./context/ServicesContext.tsx";
import { StoreUserProvider } from "./context/StoreUsersContext.tsx";
import { OrderProvider } from "./context/OrderContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <StoreProvider>
          <StoreUserProvider>
            <AppDataProvider>
              <FontProvider>
                <CategoryProvider>
                  <ProductProvider>
                    <ServiceProvider>
                      <OrderProvider>
                        <App />
                      </OrderProvider>
                    </ServiceProvider>
                  </ProductProvider>
                </CategoryProvider>
              </FontProvider>
            </AppDataProvider>
          </StoreUserProvider>
        </StoreProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);
