import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const Stats = () => {
  const { orders } = useContext(AppContext);
  const [stats, setStats] = useState({
    totalOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    pendingOrders: 0,
    ordersByRestaurant: {}
  });

  useEffect(() => {
    const safeOrders = Array.isArray(orders) ? orders : [];
    
    const validOrders = safeOrders.filter(o => o && o.orderId);
    
    const totalOrders = validOrders.length;
    const deliveredOrders = validOrders.filter(o => o.status?.toLowerCase() === "delivered").length;
    const cancelledOrders = validOrders.filter(o => o.status?.toLowerCase() === "cancelled").length;
    const pendingOrders = totalOrders - deliveredOrders - cancelledOrders;
    
    const ordersByRestaurant = validOrders.reduce((acc, o) => {
      const key = o.restaurant || "Unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    
    setStats({
      totalOrders,
      deliveredOrders,
      cancelledOrders,
      pendingOrders,
      ordersByRestaurant
    });
    
    window.appState = {
      totalOrders,
      deliveredOrders,
      cancelledOrders,
      pendingOrders,
      ordersByRestaurant
    };
    
  }, [orders]);
  
  return (
    <div>
      <h2>Statistics</h2>
      
      <p data-testid="total-orders">Total Orders: {stats.totalOrders}</p>
      <p data-testid="delivered-orders">Delivered Orders: {stats.deliveredOrders}</p>
      <p data-testid="cancelled-orders">Cancelled Orders: {stats.cancelledOrders}</p>
      <p>Pending Orders: {stats.pendingOrders}</p>
      
      <h3>Orders by Restaurant</h3>
      {Object.entries(stats.ordersByRestaurant).map(([name, count]) => (
        <p key={name}>{name}: {count}</p>
      ))}
      
      <p>Delivery Rate: {stats.totalOrders > 0 ? ((stats.deliveredOrders / stats.totalOrders) * 100).toFixed(1) : 0}%</p>
    </div>
  );
};

export default Stats;