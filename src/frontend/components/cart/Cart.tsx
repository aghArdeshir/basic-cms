import { useEffect, useState } from "react";
import { EVENT } from "../../../core/EVENT";
import { core } from "../../../core/EventEmitter";
import { ITEM_ADD_TO_CART } from "../../../core/Types";

export default function Cart() {
  const [lastAddedItem, setLastAddedItem] = useState<ITEM_ADD_TO_CART | null>(
    null
  );

  useEffect(() => {
    core.on<ITEM_ADD_TO_CART>(EVENT.ADD_TO_CART, (data) => {
      setLastAddedItem(data);
    });
  }, []);

  if (!lastAddedItem) return <div>no item!</div>;
  return <div>Last added item: {lastAddedItem?.id}</div>;
}
