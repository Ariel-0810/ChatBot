import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogInForm from "./LogInForm";
import useLogIn from "../../hooks/useLogIn";

jest.mock("../../hooks/useLogIn", () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockLogIn = jest.fn();
const mockLoading = false;
const mockError = null;

useLogIn.mockReturnValue({
  logIn: mockLogIn,
  loading: mockLoading,
  error: mockError
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn()
}));

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn()
  }
}));

describe("LogInForm", () => {
  const mockLogIn = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useLogIn.mockReturnValue({
      logIn: mockLogIn,
      loading: false,
      error: null
    });
    mockNavigate.mockClear();
    useNavigate.mockReturnValue(mockNavigate);
  });

  it("renderiza correctamente el formulario", () => {
    render(
      <Router>
        <LogInForm />
      </Router>
    );

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("envía los datos correctamente al hacer submit", async () => {
    mockLogIn.mockResolvedValueOnce({ success: true });

    render(
      <Router>
        <LogInForm />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText("email@gmail.com"), {
      target: { value: "email@gmail.com" }
    });
    fireEvent.change(screen.getByPlaceholderText("****************"), {
      target: { value: "Mypass123@" }
    });

    fireEvent.submit(screen.getByTestId("log-in-form"));

    await waitFor(() => {
      expect(mockLogIn).toHaveBeenCalledWith({
        email: "email@gmail.com",
        password: "Mypass123@"
      });
    });
    expect(mockNavigate).toHaveBeenCalledWith("/chat");
  });

  it("muestra errores de validación si los campos están vacíos", async () => {
    render(
      <Router>
        <LogInForm />
      </Router>
    );

    fireEvent.submit(screen.getByTestId("log-in-form"));

    await waitFor(() => {
      expect(screen.getByText(/El email es requerido/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Requerido, por favor ingrese la contraseña/i)
      ).toBeInTheDocument();
    });
  });
});
