import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import OrderItem from "../components/OrderItem";

const Filter = () => {
  const { orders } = useContext(AppContext);
  const [query, setQuery] = useState("");

  const validOrders = orders.filter(
    (o) =>
      o.items?.length > 0 &&
      o.totalAmount > 0
  );

  const filtered = validOrders.filter((o) =>
    o.restaurant?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        data-testid="filter-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search restaurant"
      />

      {query === "" ? (
        <p>Enter search</p>
      ) : filtered.length === 0 ? (
        <p>No results found</p>
      ) : (
        filtered.map((o) => (
          <OrderItem key={o.orderId} order={o} />
        ))
      )}
    </div>
  );
};

export default Filter;