import React, { createContext, useState } from "react";

export const OrderContext = createContext();

function Order({ children }) {
  const [pizzas, addPizza] = useState([]);

  function addPizzaToOrder(pizza) {
    addPizza((pizzas) => pizzas.concat(pizza));
  }

  return (
    <OrderContext.Provider
      value={{
        order: {
          pizzas,
        },
        addPizzaToOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default Order;
