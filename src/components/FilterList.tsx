import React from 'react';
import { FilterValues } from '../types';
import Trash from './Trash';
import './Styler.css';

type SetFilterValues = {
  setFilterValues: () => void,
  filterValues: FilterValues[],
};

function FilterList({ filterValues }: any) {
  console.log(filterValues.filterValues);
  return (
    <div>
      { filterValues.filterValues.map((flt: FilterValues, index: number) => {
        return (
          <div data-testid="filter" key={ index } className="flex-container">
            <p>{ `${flt.column} ${flt.comparison} ${flt.value}` }</p>
            <Trash
              setFilterValues={
              { setFilterValues: filterValues.setFilterValues,
                column: `${flt.column}`,
                filterValues: filterValues.filterValues,
                setOptions: filterValues.setOptions,
                options: filterValues.options }
}
            />
          </div>
        );
      }) }
    </div>
  );
}

export default FilterList;
