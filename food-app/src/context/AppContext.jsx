import { createContext, useReducer, useEffect } from "react";
import { getToken, getDataset } from "../services/api";
import AppReducer from "../reducer/AppReducer";

export const AppContext = createContext();

const initialState = {
  orders: [],
  allData: null,
  loading: false,
  error: null
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        
        const tokenResponse = await getToken("E0423023", "581442", "A");
        const token = tokenResponse.token;
        const dataUrl = tokenResponse.dataUrl;
        
        const dataset = await getDataset(token, dataUrl);
        console.log("Full dataset:", dataset);
                const ordersArray = dataset?.data?.orders || [];
        
        console.log("Orders array extracted:", ordersArray);
        console.log("Number of orders:", ordersArray.length);
        
        dispatch({ 
          type: "SET_DATA", 
          payload: { 
            orders: ordersArray, 
            allData: dataset.data 
          }
        });
      } catch (err) {
        console.error("Error in loadData:", err);
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };

    loadData();
  }, []);

  const markOrderAsDelivered = (orderId) => {
    dispatch({ type: "MARK_ORDER_DELIVERED", payload: orderId });
    console.log(`Order ${orderId} marked as delivered`);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    dispatch({ type: "UPDATE_ORDER_STATUS", payload: { orderId, newStatus } });
  };

  return (
    <AppContext.Provider value={{ 
      ...state, 
      dispatch,
      markOrderAsDelivered,
      updateOrderStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};