import React, { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const OrderContext = createContext();

function Order({ children }) {
  const [pizzas, addPizza] = useState([]);
  const [orderInProgress, setOrderInProgress] = useState(false);
  const [phone, addPhone] = useState("");
  const [address, addAddress] = useState({});

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
          address,
          phone,
        },
        addPizzaToOrder,
        sendOrder,
        removePizzaFromOrder,
        addAddress,
        addPhone,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default Order;
