import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SingleItem from "../src/components/SingleItem";
import { itemList } from "../src/itemList";
const item = itemList[0]



describe('Single Item Component', () => {
test('renders single item correctly', () => {
    const { asFragment } = render(
      <SingleItem item={item} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
})
