import React, { useState } from 'react';
import { usePlanetContext, Planet } from '../context/PlanetsContext';
import { Columns, Comparisons, FilterValues } from '../types';
import FilterList from './FilterList';
import LineTable from './LineTable';

function Table() {
  const { planets } = usePlanetContext();
  const [filterName, setFilterName] = useState('');
  const [column, setColumn] = useState<Columns>('population');
  const [comparison, setComparison] = useState<Comparisons>('maior que');
  const [value, setValue] = useState(0);
  const [filterValues, setFilterValues] = useState<FilterValues[]>([]);
  const [options, setOptions] = useState(
    ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
  );
  const [order, setOrder] = useState<{ column: Columns, sort: 'ASC' | 'DESC' }>(
    { column: 'population', sort: 'ASC' },
  );
  const selectOrder = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const [planetListOrder, setPlanetListOrder] = useState<Planet[]>([]);

  const removeOptions = (opt: string) => {
    const removeOpt = options.filter((option) => option !== opt);
    setOptions(removeOpt);
  };

  const handleRemoveFilters = () => {
    setFilterValues([]);
    setPlanetListOrder([]);
    setOptions(
      ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'],
    );
  };

  const [, updateState] = React.useState<any>();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const filterByName = (planet: Planet): boolean => planet
    .name.toLowerCase().includes(filterName.toLowerCase());

  const filterByValues = (currentFilter: FilterValues) => {
    return (planet: Planet): boolean => {
      switch (currentFilter.comparison) {
        case 'maior que':
          return Number(planet[currentFilter.column]) > currentFilter.value;
        case 'menor que':
          return Number(planet[currentFilter.column]) < currentFilter.value;
        default:
          return Number(planet[currentFilter.column]) === currentFilter.value;
      }
    };
  };

  let filteredPlanets = planets.filter(filterByName);
  if (filterValues.length > 0) {
    filterValues.forEach((flt) => {
      filteredPlanets = filteredPlanets.filter(filterByValues(flt));
    });
  }

  const comparePlanets = (a: any, b: any) => {
    const filterA = Number(a[order.column]);

    const filterB = Number(b[order.column]);

    let comparacao = 0;
    if (order.sort === 'ASC') {
      if (filterA > filterB) {
        comparacao = 1;
      } else if (filterA < filterB) {
        comparacao = -1;
      }
    } else if (order.sort === 'DESC') {
      if (filterA < filterB) {
        comparacao = 1;
      } else if (filterA > filterB) {
        comparacao = -1;
      }
    }
    return comparacao;
  };

  const handleOrderPlanets = () => {
    const planetOrder = filteredPlanets.sort(comparePlanets);
    const plantOrderUnknown = [];
    const planetOrderNotUnknown = [];
    for (let index = 0; index < planetOrder.length; index++) {
      const element = planetOrder[index];

      if (element[order.column] === 'unknown') {
        plantOrderUnknown.push(element);
      } else {
        planetOrderNotUnknown.push(element);
      }
    }
    const result = planetOrderNotUnknown.concat(plantOrderUnknown);

    setPlanetListOrder(result);
  };

  return (
    <div>
      <input
        type="text"
        value={ filterName }
        onChange={ (e) => setFilterName(e.target.value) }
        data-testid="name-filter"
      />
      <select
        data-testid="column-filter"
        onChange={ (e) => setColumn(e.target.value as Columns) }
      >
        { options.map((opt, index) => {
          if (opt === 'population') {
            return <option key={ index } value={ opt } selected>{ opt }</option>;
          }
          return (
            <option key={ index } value={ opt }>{ opt }</option>
          );
        })}
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
          const newValues = filterValues;
          newValues.push({ column, comparison, value });
          setFilterValues(newValues);
          forceUpdate();
          removeOptions(column);
        } }
      >
        Filtrar
      </button>
      <select
        data-testid="column-sort"
        onChange={ (e: any) => setOrder(
          { ...order, column: e.target.value },
        ) }
      >
        { selectOrder.map((opt, index) => {
          return (
            <option key={ index } value={ opt }>{ opt }</option>
          );
        })}
      </select>
      <input
        type="radio"
        name="base"
        data-testid="column-sort-input-asc"
        value="ASC"
        onChange={ () => setOrder({ ...order, sort: 'ASC' }) }
      />
      Ascendente
      <input
        type="radio"
        name="base"
        data-testid="column-sort-input-desc"
        value="DESC"
        onChange={ () => setOrder({ ...order, sort: 'DESC' }) }
      />
      Descendente
      <button
        data-testid="column-sort-button"
        onClick={ () => { handleOrderPlanets(); } }
      >
        Ordenar
      </button>
      <button
        data-testid="button-remove-filters"
        onClick={ handleRemoveFilters }
      >
        Remover todas filtragens
      </button>
      <FilterList
        filterValues={ { filterValues,
          setFilterValues,
          setOptions,
          options } }
      />
      <table width="500">
        <title>Tabela de Planetas</title>
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
        <LineTable props={ { filteredPlanets, planetListOrder } } />
      </table>
    </div>
  );
}

export default Table;
