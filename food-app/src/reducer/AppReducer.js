const AppReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        orders: action.payload.orders,
        allData: action.payload.allData,
        loading: false
      };
    
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload
      };
    
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        loading: false
      };
        case "UPDATE_ORDER_STATUS":
      const updatedOrders = state.orders.map(order => 
        order.orderId === action.payload.orderId 
          ? { ...order, status: action.payload.newStatus }
          : order
      );
      
      return {
        ...state,
        orders: updatedOrders
      };
        case "MARK_ORDER_DELIVERED":
      const markedOrders = state.orders.map(order =>
        order.orderId === action.payload
          ? { ...order, status: "Delivered" }
          : order
      );
      
      return {
        ...state,
        orders: markedOrders
      };

    default:
      return state;
  }
};

export default AppReducer;