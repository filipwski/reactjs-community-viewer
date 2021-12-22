import './Table.styles.css';
import { Cell, Column, useSortBy, useTable } from 'react-table';
import { Dictionary } from 'lodash';

export type TableDictionary = Dictionary<string | number | null | TableDictionary>;

export type TableProps<T extends TableDictionary> = {
  columns: Column<T>[];
  data: T[];
  renderCell?: (cell: Cell<T>) => JSX.Element | undefined;
};

export const Table = <T extends TableDictionary>({ columns, data, renderCell }: TableProps<T>) => {
  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
  } = useTable({ columns, data }, useSortBy);

  /* eslint-disable react/jsx-key */
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                <span>
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' ▼'
                      : ' ▲'
                    : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>
                  {
                    (renderCell && renderCell(cell)) ?? cell.render('Cell')
                  }
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
