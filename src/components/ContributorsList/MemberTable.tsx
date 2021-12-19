import { Dictionary } from "lodash";
import { Column, useTable, useSortBy } from "react-table";

type Data = Dictionary<string | number | Data | undefined | null>;

type Props = {
  columns: Column<Data>[],
  data: Data[],
};
export const MemberTable = ({ columns, data }: Props) => {
  const {
    getTableProps, getTableBodyProps, headerGroups, rows, prepareRow,
  } = useTable({ columns, data }, useSortBy);

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
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                typeof cell.value === 'string' && cell.value.startsWith('https://')
                  ? <td {...cell.getCellProps()}>
                      <a href={cell.value}>
                        <img id="github-logo" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"/>
                      </a>
                    </td>
                  : <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
