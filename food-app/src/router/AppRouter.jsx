import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Orders from "../pages/Orders";
import OrderDetail from "../pages/OrderDetail";
import Filter from "../pages/Filter";
import Stats from "../pages/Stats";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/orders" replace />} />
        
        {/* Your existing routes */}
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;