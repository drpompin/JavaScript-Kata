import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CheckoutComponent from "../pages/checkout";
import { KataContext } from "../context";

const mockState = [
  {
    name: "Item A",
    qty: 2,
    specialPrice: "3 for 130",
    total: 100,
    unitPrice: 50
  },
  {
    name: "Item C",
    qty: 1,
    specialPrice: "",
    total: 20,
    unitPrice: 20
  }
];

const mockContext = {
  kataState: mockState,
  clearCart: jest.fn(),
};

describe("CheckoutComponent", () => {
  test("renders without errors", () => {
    render(
      <KataContext.Provider value={mockContext}>
        <CheckoutComponent />
      </KataContext.Provider>
    );
  });


  test("calls the clearCart function when Clear Cart button is clicked", () => {
    const { getByTestId } = render(
      <KataContext.Provider value={mockContext}>
        <CheckoutComponent />
      </KataContext.Provider>
    );

    const clearCartButton = getByTestId("clearCart");
    fireEvent.click(clearCartButton);
    expect(mockContext.clearCart).toHaveBeenCalled();
  });
});
