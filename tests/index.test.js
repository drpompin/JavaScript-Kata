import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import mockRouter from 'next-router-mock';
import Home from "../pages/index";

jest.mock('next/router', () => require('next-router-mock'));


describe('next-router-mock', () => {
  test('mocks the useRouter hook', () => {
    mockRouter.push("/");
    
    render(<Home href="/" />);
    expect(screen.getByTestId('navToCheckout')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('navToCheckout'));
    
    expect(mockRouter).toMatchObject({ 
      asPath: "/checkout",
      pathname: "/checkout",
      query: {},
    });
  });
});

describe('Home Component', () => {

    test('renders home page correctly', () => {
        render(<Home />)

        const WelcomeElement = screen.getByTestId('welcome');
        const ItemContainer = screen.getByTestId('itemContainer');
        
        expect(WelcomeElement).toBeInTheDocument();
        expect(ItemContainer).toBeInTheDocument();
    })

    test('renders button component correctly', () => {
        render(<Home />)

        const WelcomeElement = screen.getAllByTestId('addItem');
        
        expect(WelcomeElement).toHaveLength(4);
    })
})
