import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const OrderItem = ({ order }) => {
  const { dispatch } = useContext(AppContext);

  return (
    <div data-testid="order-item">
      <p>{order.customerName || "Unknown"}</p>
      <p>{order.restaurant}</p>
      <p>Status: {order.status}</p>

      {order.status !== "delivered" && (
        <button onClick={() =>
          dispatch({ type: "MARK_DELIVERED", payload: order.orderId })
        }>
          Mark Delivered
        </button>
      )}
    </div>
  );
};

export default OrderItem;