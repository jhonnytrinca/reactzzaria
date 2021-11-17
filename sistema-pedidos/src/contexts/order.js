import React, { createContext, useState } from "react";
import uuidv4 from "uuid/v4";

export const OrderContext = createContext();

function Order({ children }) {
  const [pizzas, addPizza] = useState([]);
  const [orderInProgress, setOrderInProgress] = useState(false);

  function addPizzaToOrder(pizza) {
    if (orderInProgress) {
      return addPizza((pizzas) => pizzas.concat(newPizza(pizza)));
    }
    setOrderInProgress(true);
    addPizza([newPizza(pizza)]);
  }

  function newPizza(pizza) {
    return { id: uuidv4(), ...pizza };
  }

  function removePizzaFromOrder(id) {
    addPizza((pizzas) => pizzas.filter((p) => p.id !== id));
  }

  function sendOrder() {
    setOrderInProgress(false);
  }

  return (
    <OrderContext.Provider
      value={{
        order: {
          pizzas,
        },
        addPizzaToOrder,
        sendOrder,
        removePizzaFromOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default Order;
