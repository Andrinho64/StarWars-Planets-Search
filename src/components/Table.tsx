import React, { useContext, useState } from 'react';
import { usePlanetContext } from '../context/PlanetsContext';

function Table() {
  const { planets } = usePlanetContext();
  const [filter, setFilter] = useState('');

  const filteredPlanets = planets.filter(
    (planet) => planet.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        value={ filter }
        onChange={ (e) => setFilter(e.target.value) }
        data-testid="name-filter"
      />
      <table width="500">
        <caption>Título ou legenda da tabela</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
