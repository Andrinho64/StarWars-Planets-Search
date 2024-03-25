import React from 'react';
import { FilterValues } from '../types';

function FilterList({ filterValues }: { filterValues: FilterValues[] }) {
  return (
    <div>
      { filterValues.map((flt: FilterValues, index: number) => (
        <p key={ index }>{ `${flt.column} ${flt.comparison} ${flt.value}` }</p>
      )) }
    </div>
  );
}

export default FilterList;
