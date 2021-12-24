import React from "react";
import Item from "../components/item/Item";

const thingsToDemo: [string, JSX.Element][] = [
  [
    "ITEM",
    <Item
      id={1}
      description="Some very very very long description"
      imageSrc="https://via.placeholder.com/150"
      price={2000}
      title="Some Title"
    />,
  ],
];

export default function KitchenSink() {
  return (
    <>
      {thingsToDemo.map(([name, thing]) => (
        <>
          {name}
          <br />
          {thing}
          <hr />
          <hr />
          <hr />
        </>
      ))}
    </>
  );
}
