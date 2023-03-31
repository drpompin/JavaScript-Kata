import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SingleCartItem from "../src/components/SingleCartItem";

const kataCartItemMock = {
    image: {src: '/_next/static/media/hawaiian-pizza.051da743.jpg'},
    name: "Item A",
    qty: 1,
    specialPrice: "3 for 130",
    total: 50,
    unitPrice: 50
}

describe('Single Cart Item Component', () => {
test('renders single cart item correctly', () => {
    const { asFragment } = render(
      <SingleCartItem item={kataCartItemMock} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
})
