import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetContextProvider from './context/PlanetsContext';

function App() {
  return (
    <PlanetContextProvider>
      <Table />
    </PlanetContextProvider>
  );
}

export default App;
