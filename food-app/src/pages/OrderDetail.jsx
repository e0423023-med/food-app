// src/pages/OrderDetail.jsx
import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const OrderDetail = () => {
  const { id } = useParams();
  const { orders } = useContext(AppContext);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orders && Array.isArray(orders)) {
      const foundOrder = orders.find(o => String(o.orderId) === String(id));
      setOrder(foundOrder || null);
      setLoading(false);
    }
  }, [orders, id]);

  useEffect(() => {
    if (order) {
      window.appState = {
        currentOrder: order,
        orderId: order.orderId,
        totalAmount: order.totalAmount,
        status: order.status
      };
    }
  }, [order]);

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (!order) {
    return (
      <div>
        <p>Order #{id} not found</p>
        <Link to="/orders">Back to Orders</Link>
      </div>
    );
  }

  const subtotal = order.items?.reduce((sum, item) => sum + ((item?.price || 0) * (item?.quantity || 1)), 0) || 0;
  const tax = (order.totalAmount || 0) - subtotal;

  return (
    <div>
      <Link to="/orders">← Back to Orders</Link>
      
      <h2>Order #{order.orderId}</h2>
      
      <p><strong>Customer:</strong> {order.customerName || "Unknown"}</p>
      <p><strong>Restaurant:</strong> {order.restaurant || "Unknown"}</p>
      <p><strong>Status:</strong> {order.status || "Pending"}</p>
      <p><strong>Order Date:</strong> {order.orderDate || "N/A"}</p>
      
      <h3>Items</h3>
      {order.items?.length > 0 ? (
        order.items.map((item, index) => (
          <div key={index} style={{ margin: "10px 0", padding: "10px", border: "1px solid #eee" }}>
            <p><strong>{item?.name || "Unknown item"}</strong></p>
            <p>Quantity: {item?.quantity || 1}</p>
            <p>Price: ₹{(item?.price || 0).toFixed(2)}</p>
            <p>Total: ₹{((item?.price || 0) * (item?.quantity || 1)).toFixed(2)}</p>
          </div>
        ))
      ) : (
        <p>No items found</p>
      )}
      
      <h3>Summary</h3>
      <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
      <p>Tax: ₹{tax.toFixed(2)}</p>
      <p><strong>Total: ₹{(order.totalAmount || 0).toFixed(2)}</strong></p>
    </div>
  );
};

export default OrderDetail;