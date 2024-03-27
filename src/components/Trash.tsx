export default function Trash({ setFilterValues }: any) {
  const handleClick = () => {
    const removeItem = setFilterValues.filterValues.filter(
      (element: any) => element.column !== setFilterValues.column,
    );
    setFilterValues.setFilterValues(removeItem);
    setFilterValues.setOptions([setFilterValues.column, ...setFilterValues.options]);
  };

  return (
    <button onClick={ handleClick }>
      🗑️
    </button>
  );
}
