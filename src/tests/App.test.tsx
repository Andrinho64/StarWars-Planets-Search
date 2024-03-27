import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { vi } from "vitest";
import App from '../App';
import Table from '../components/Table';
import PlanetContextProvider from '../context/PlanetsContext';
import { element } from 'prop-types';
import testData from './mocks/testData';

const INPUT_NAME_FILTER_SELECTOR = 'name-filter'; 
const SELECT_COLUMN_FILTER_SELECTOR = 'column-filter'; 
const SELECT_COMPARISON_FILTER_SELECTOR = 'comparison-filter'; 
const INPUT_VALUE_FILTER_SELECTOR = 'value-filter';
const BTN_FILTER_SELECTOR = 'button-filter'; 
const ROW_ROLE_SELECTOR = 'row';
const BTN_CLEAR_ALL_SELECTOR =  'button-remove-filters';

const mockFetch = () => {
  vi.spyOn(global, "fetch").mockResolvedValue({
    status: 200,
    ok: true,
    json: async () => testData,
  } as Response);
};

beforeAll(mockFetch);

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

test('Filter Planets by the letter "o"', async () => {
  render (<App />);
  await waitFor(async () => {
    const inputElement = screen.getByTestId(INPUT_NAME_FILTER_SELECTOR);
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { value: 'o' } });
    expect(screen.getAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(8);
    const planetNames = ['Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine'];
    planetNames.forEach((planetName) => expect(screen.getByText(planetName)).toBeInTheDocument());
  });
});

test('Render column filter', () => {
  render(<App />);
  const column = screen.getByTestId(SELECT_COLUMN_FILTER_SELECTOR);
  expect(column).toHaveProperty('nodeName', 'SELECT');
  const columns = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const foundColumnFilter = Array.from(column.children).map(child => {
    expect(child).toHaveProperty('nodeName', 'OPTION');
    return child.innerHTML;
  });
  expect(foundColumnFilter).toEqual(expect.arrayContaining(columns));
});

test('Render comparison filter', () => {
  render(<App />);
  const comparison = screen.getByTestId(SELECT_COMPARISON_FILTER_SELECTOR);
  expect(comparison).toHaveProperty('nodeName', 'SELECT');
  const comparisons = ['maior que', 'menor que', 'igual a'];
  const foundComparisonFilter = Array.from(comparison.children).map(child => {
    expect(child).toHaveProperty('nodeName', 'OPTION');
    return child.innerHTML;
  });
  expect(foundComparisonFilter).toEqual(expect.arrayContaining(comparisons));
});

test('Render comparison filter', () => {
  render(<App />);
  expect(screen.getByTestId(INPUT_VALUE_FILTER_SELECTOR)).toHaveProperty('nodeName', 'INPUT');
});

test('Filter by numeric values', async () => {
  render(<App />);
  await waitFor(async () => {
    fireEvent.click(screen.getByTestId(BTN_CLEAR_ALL_SELECTOR));
    fireEvent.change(screen.getByTestId(SELECT_COLUMN_FILTER_SELECTOR), { target: { value: 'surface_water' } });
    fireEvent.change(screen.getByTestId(SELECT_COMPARISON_FILTER_SELECTOR), { target: { value: 'menor que' } });
    fireEvent.change(screen.getByTestId(INPUT_VALUE_FILTER_SELECTOR), { target: { value: '2' } });
    fireEvent.click(screen.getByTestId(BTN_FILTER_SELECTOR));
    expect(screen.getAllByRole(ROW_ROLE_SELECTOR)).toHaveLength(3);
  });
});