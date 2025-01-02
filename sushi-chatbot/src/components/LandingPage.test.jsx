import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './LandingPage';

describe('LandingPage', () => {
  test('renders main heading', () => {
    render(
      <Router>
        <LandingPage />
      </Router>
    );
    const headingElement = screen.getByText(/Experimente el arte del sushi/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders login button', () => {
    render(
      <Router>
        <LandingPage />
      </Router>
    );
    const loginButton = screen.getByText(/Login/i);
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveAttribute('href', '/log-in');
  });

  test('renders specialties section', () => {
    render(
      <Router>
        <LandingPage />
      </Router>
    );
    const specialtiesHeading = screen.getByText(/Nuestras Especialidades/i);
    expect(specialtiesHeading).toBeInTheDocument();
    expect(screen.getByText(/Nigiri/i)).toBeInTheDocument();
    expect(screen.getByText(/Maki Rolls/i)).toBeInTheDocument();
    expect(screen.getByText(/Sashimi/i)).toBeInTheDocument();
  });

  test('renders customer testimonials', () => {
    render(
      <Router>
        <LandingPage />
      </Router>
    );
    const testimonialsHeading = screen.getByText(/Lo que dicen nuestros clientes/i);
    expect(testimonialsHeading).toBeInTheDocument();
    expect(screen.getByText(/Sarah L./i)).toBeInTheDocument();
    expect(screen.getByText(/Mike T./i)).toBeInTheDocument();
    expect(screen.getByText(/Emily R./i)).toBeInTheDocument();
  });
});