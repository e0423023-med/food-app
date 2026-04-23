import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const Orders = () => {
  const { orders, loading, error, markOrderAsDelivered } = useContext(AppContext);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (Array.isArray(orders)) {
      const filtered = orders.filter(order => 
        order?.restaurant?.toLowerCase().includes(filterText.toLowerCase()) ||
        order?.orderId?.toString().includes(filterText) ||
        order?.customerName?.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders([]);
    }
  }, [orders, filterText]);

  const handleMarkDelivered = (orderId, currentStatus) => {
    if (currentStatus === "Delivered") {
      setMessage(`Order ${orderId} is already delivered`);
      setTimeout(() => setMessage(""), 2000);
      return;
    }
    
    markOrderAsDelivered(orderId);
    setMessage(`Order ${orderId} marked as delivered`);
    setTimeout(() => setMessage(""), 2000);
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }
  
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div>
        <h2>Orders</h2>
        <p>No orders found</p>
      </div>
    );
  }
  
  const validOrders = filteredOrders.filter(order => order && (order.orderId || order.id));
  
  return (
    <div>
      <h2>Orders</h2>
      
      {message && <div style={{ padding: "10px", margin: "10px 0", border: "1px solid #ccc" }}>{message}</div>}
      
      <input
        type="text"
        data-testid="filter-input"
        placeholder="Filter by restaurant, order ID, or customer..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        style={{ margin: "10px 0", padding: "8px", width: "300px", border: "1px solid #ccc" }}
      />
      
      <p>Showing {validOrders.length} of {orders.length} orders</p>
      
      {validOrders.map((order) => (
        <div key={order.orderId} style={{ 
          border: "1px solid #ccc", 
          margin: "10px 0", 
          padding: "15px"
        }}>
          <Link to={`/orders/${order.orderId}`}>
            <h3>Order #{order.orderId}</h3>
          </Link>
          <p><strong>Customer:</strong> {order.customerName || "Unknown"}</p>
          <p><strong>Restaurant:</strong> {order.restaurant || "Unknown"}</p>
          <p><strong>Status:</strong> {order.status || "Pending"}</p>
          <p><strong>Total Amount:</strong> ₹{(order.totalAmount || 0).toFixed(2)}</p>
          <p><strong>Items:</strong> {order.items?.length || 0}</p>
          
          <button
            onClick={() => handleMarkDelivered(order.orderId, order.status)}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              border: "1px solid #ccc",
              background: "#fff",
              cursor: order.status === "Delivered" ? "default" : "pointer"
            }}
            disabled={order.status === "Delivered"}
          >
            {order.status === "Delivered" ? "Delivered" : "Mark Delivered"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Orders;