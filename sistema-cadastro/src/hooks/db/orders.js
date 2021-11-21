import { useEffect, useState, useMemo } from "react";
import { db } from "../../services/firebase";
import { getDocs, collection } from "firebase/firestore";

function useOrders() {
  const [orders, setOrders] = useState(null);

  const status = useMemo(
    () => ({
      pending: "pending",
      inProgress: "inProgress",
      outForDelivery: "outForDelivery",
      delivered: "delivered",
    }),
    []
  );

  useEffect(() => {
    const loadData = async () => {
      const querySnapshot = await getDocs(collection(db, "orders"));
      let docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const initialStatus = Object.keys(status).reduce((acc, status) => {
        acc[status] = [];
        return acc;
      }, {});

      setOrders(
        docs.reduce((acc, doc) => {
          const mainStatus = doc.status || status.pending;

          return {
            ...acc,
            [mainStatus]: acc[mainStatus].concat(doc),
          };
        }, initialStatus)
      );
    };
    loadData();
  }, [status]);

  return { orders, status };
}

export default useOrders;
