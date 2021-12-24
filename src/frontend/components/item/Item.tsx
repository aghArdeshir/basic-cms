import styled from "styled-components";
import { EVENT } from "../../../core/EVENT";
import { core } from "../../../core/EventEmitter";

type Props = {
  id: number;
  imageSrc: string;
  title: string;
  description: string;
  price: number;
};

const Wrapper = styled.div`
  border: 1px solid black;
  display: inline-block;
`;

export default function Item({
  id,
  imageSrc,
  title,
  description,
  price,
}: Props) {
  return (
    <Wrapper>
      <div>
        <img src={imageSrc} alt={title} />
      </div>
      <div>
        <p>{title}</p>
        <p>{description}</p>
        <p>{price}</p>
      </div>
      <div>
        <button
          onClick={() => {
            core.emit(EVENT.ADD_TO_CART, { id });
          }}
        >
          + Add to cart
        </button>
      </div>
    </Wrapper>
  );
}
