import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { vi } from "vitest";
import testData from './mock/data';
import App from '../App';
import Table from '../components/Table';
import PlanetContextProvider from '../context/PlanetsContext';

test('renders table with initial data', () => {
  render(<App />);
  const tableElement = screen.getByText(/Tabela de Planetas/i);
  expect(tableElement).toBeInTheDocument();
});

test('renders a columun "Name" of a table', () => {
  render(<App />);
  const tableElement = screen.getByText(/Name/i);
  expect(tableElement).toBeInTheDocument();
});

test('renders a columun "Climate" of a table', () => {
  render(<App />);
  const tableElement = screen.getByText(/Climate/i);
  expect(tableElement).toBeInTheDocument();
});

test('renders a columun "Gravity" of a table', () => {
  render(<App />);
  const tableElement = screen.getByText(/Gravity/i);
  expect(tableElement).toBeInTheDocument();
});

/* test('filters planets by name', async () => {
  render(
    <PlanetContextProvider>
      <Table />
    </PlanetContextProvider>
  );
  vi.spyOn(global, "fetch").mockResolvedValue({
    status: 200,
    ok: true,
    json: async () => testData,
  } as Response);
  const nameFilterInput = screen.getByTestId('name-filter');

  fireEvent.change(nameFilterInput, { target: { value: 'Tatoo' } });

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
    const filteredPlanet = screen.getByText((content, element) => {
      return content.startsWith('Tatooine');
    });
    // expect(filteredPlanet).toBeInTheDocument();
  });
}); */

