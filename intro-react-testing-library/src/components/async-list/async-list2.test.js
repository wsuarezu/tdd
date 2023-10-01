import React from "react";
import { render, screen } from '@testing-library/react';
import AsyncList from "./async-list";

test('should show the food data', async() => {

    render( < AsyncList / > );

    const hamburger = await screen.findByText(/hamburger/i);

    expect(hamburger).toBeInTheDocument();
    expect(await screen.findByText(/pizza/i)).toBeInTheDocument();
    expect(await screen.findByText(/tacos/i)).toBeInTheDocument();

})