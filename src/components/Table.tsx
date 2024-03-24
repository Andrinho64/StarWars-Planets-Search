import React, { useContext, useState } from 'react';
import { usePlanetContext, Planet } from '../context/PlanetsContext';

type Columns = 'population'
| 'orbital_period' | 'diameter' | 'rotation_period' | 'surface_water';

type Comparisons = 'maior que' | 'menor que' | 'igual a';

type FilterValues = {
  column: Columns;
  comparison: Comparisons;
  value: number;
};

function Table() {
  const { planets } = usePlanetContext();
  const [filter, setFilter] = useState('');
  const [column, setColumn] = useState<Columns>('population');
  const [comparison, setComparison] = useState<Comparisons>('maior que');
  const [value, setValue] = useState(0);
  const [disableFilter, setDisableFilter] = useState(true);
  const [filterValues, setFilterValues] = useState<FilterValues>(
    { column: 'population', comparison: 'maior que', value: 0 },
  );

  const filterByName = (planet: Planet): boolean => planet
    .name.toLowerCase().includes(filter.toLowerCase());

  const filterByValues = (planet: Planet): boolean => {
    if (disableFilter) {
      return true;
    }
    switch (filterValues.comparison) {
      case 'maior que':
        return Number(planet[filterValues.column]) > filterValues.value;
      case 'menor que':
        return Number(planet[filterValues.column]) < filterValues.value;
      default:
        return Number(planet[filterValues.column]) === filterValues.value;
    }
  };

  const filteredPlanets = planets
    .filter(filterByName)
    .filter(filterByValues);

  return (
    <div>
      <input
        type="text"
        value={ filter }
        onChange={ (e) => setFilter(e.target.value) }
        data-testid="name-filter"
      />
      <select
        data-testid="column-filter"
        onChange={ (e) => setColumn(e.target.value as Columns) }
      >
        <option value="population" selected>population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ (e) => setComparison(e.target.value as Comparisons) }
      >
        <option value="maior que" selected>maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ (e) => setValue(Number(e.target.value)) }
        defaultValue="0"
      />
      <button
        data-testid="button-filter"
        onClick={ () => {
          setDisableFilter(false);
          setFilterValues({ column, comparison, value });
        } }
      >
        Filtrar
      </button>
      <table width="500">
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
