import { fireEvent, render, screen } from "@testing-library/react";
import { ComponentProps } from "react";
import { EVENT } from "../../../../core/EVENT";
import { core } from "../../../../core/EventEmitter";
import Item from "../Item";

const itemProps: ComponentProps<typeof Item> = {
  id: 1,
  title: "",
  description: "",
  price: 0,
  imageSrc: "",
};

test("clicking add to cart must emit correct event with correct payload", () => {
  render(<Item {...itemProps} />);
  const listener = jest.fn();
  core.on(EVENT.ADD_TO_CART, listener);

  fireEvent.click(screen.getByText("+ Add to cart"));

  expect(listener).toHaveBeenCalledWith({ id: itemProps.id });
});
