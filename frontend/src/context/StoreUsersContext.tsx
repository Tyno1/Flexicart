import axios from "axios";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { StoreContext } from "./StoreContext";

type StoreUserContextProps = {
  loading: boolean;
  error: any;
  storeUsers: any;
  setStoreUsers: any;
};

type StoreUserProviderProps = {
  children: React.ReactNode;
};

export const StoreUserContext = createContext({} as StoreUserContextProps);

export const StoreUserProvider = ({ children }: StoreUserProviderProps) => {
  const { store } = useContext(StoreContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [storeUsers, setStoreUsers] = useState<any>([]);

  const getStoreUsers = () => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setLoading(true);
      axios
        .get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_SERVER_URL}/shop-users/${
            store._id
          }/users`
        )
        .then((response) => {
          setLoading(false);
          setStoreUsers(response.data);
          console.log(response.data);
          resolve(response);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          reject(error);
        });
    });
  };

  useEffect(() => {
    if (store) {
      getStoreUsers();
    }
  }, [store]);

  return (
    <StoreUserContext.Provider
      value={{
        loading,
        error,
        setStoreUsers,
        storeUsers,
      }}
    >
      {children}
    </StoreUserContext.Provider>
  );
};
