import React from "react";
import { screen, render, fireEvent, waitFor, getByLabelText } from "@testing-library/react";
import { LoginPage } from "./login-page";
import { AuthContext } from '../../../utils/contexts/auth-context'

const handleSuccessLogin = jest.fn();
const user = {}

beforeEach(() => {
    render( <
        AuthContext.Provider value = {
            { handleSuccessLogin, user }
        } >
        <
        LoginPage / >
        <
        /AuthContext.Provider>
    );
})

describe('When login page is mounted', () => {

    test('must display the login title', () => {
        expect(screen.getByText(/login page/i)).toBeInTheDocument();
    });

    test('must have a form with the following fields: email, password and a submit button', () => {
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /send/i }));
    });

});

describe('when the user leaves empty fields and clicks the submit button', () => {

    test('display required messages as the format: "The [field name] is required"', async() => {
        expect(screen.queryByText(/the email is required/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/the password is required/i)).not.toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: /send/i }));

        await waitFor(() => {
            expect(screen.getByText(/the email is required/i)).toBeInTheDocument();
            expect(screen.getByText(/the password is required/i)).toBeInTheDocument();
        })
    })
});

describe('when the user fills the fields and clicks the submit button', () => {

    test('must not display the required messages', () => {
        expect(screen.queryByText(/the email is required/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/the password is required/i)).not.toBeInTheDocument();

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@prueba.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '12345678' } });

        fireEvent.click(screen.getByRole('button', { name: /send/i }));

        expect(screen.queryByText(/the email is required/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/the password is required/i)).not.toBeInTheDocument();

    })
});