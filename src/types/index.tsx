export type Columns = 'population'
| 'orbital_period' | 'diameter' | 'rotation_period' | 'surface_water';

export type Comparisons = 'maior que' | 'menor que' | 'igual a';

export type FilterValues = {
  column: Columns;
  comparison: Comparisons;
  value: number;
};
