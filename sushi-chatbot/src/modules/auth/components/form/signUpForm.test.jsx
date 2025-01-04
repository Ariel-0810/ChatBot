import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./signUpForm";
import useSignUp from "../../hooks/useSignUp";

jest.mock("../../hooks/useSignUp", () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn()
}));

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn()
  }
}));

describe("SignUpForm", () => {
  const mockSignUp = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useSignUp.mockReturnValue({
      signUp: mockSignUp,
      loading: false
    });
    mockNavigate.mockClear();
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("renderiza correctamente el formulario", () => {
    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    expect(screen.getByText("Crear Cuenta")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre de usuario")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Registrarse" })
    ).toBeInTheDocument();
  });

  it("envía los datos correctamente al hacer submit", async () => {
    mockSignUp.mockResolvedValueOnce({ success: true });

    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("my_username02"), {
      target: { value: "my_username02" }
    });
    fireEvent.change(screen.getByPlaceholderText("email@gmail.com"), {
      target: { value: "email@gmail.com" }
    });
    fireEvent.change(screen.getByPlaceholderText("****************"), {
      target: { value: "Mypass123@" }
    });

    fireEvent.submit(screen.getByTestId("sign-up-form"));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: "email@gmail.com",
        password: "Mypass123@",
        username: "my_username02"
      });
    });
    expect(mockNavigate).toHaveBeenCalledWith("/log-in");
  });

  it("muestra errores de validación si los campos están vacíos", async () => {
    render(
      <Router>
        <SignUpForm />
      </Router>
    );

    fireEvent.submit(screen.getByTestId("sign-up-form"));

    await waitFor(() => {
      expect(
        screen.getByText(/Required, Please Enter your User Name/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Please Enter your password/i)
      ).toBeInTheDocument();
    });
  });
});
