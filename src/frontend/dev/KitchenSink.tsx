import Cart from "../components/cart/Cart";
import Item from "../components/item/Item";

const thingsToDemo: [string, JSX.Element][] = [
  [
    "ITEM WITH ID 1",
    <Item
      id={1}
      description="Some very very very long description"
      imageSrc="https://via.placeholder.com/150"
      price={2000}
      title="Some Title"
    />,
  ],
  [
    "ITEM WITH ID 2",
    <Item
      id={2}
      description="This is another item"
      imageSrc="https://via.placeholder.com/150"
      price={4500}
      title="The Second Item"
    />,
  ],
  ["CART", <Cart />],
];

export default function KitchenSink() {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
      {thingsToDemo.map(([name, thing]) => (
        <div key={name}>
          {name}
          <br />
          {thing}
        </div>
      ))}
    </div>
  );
}
