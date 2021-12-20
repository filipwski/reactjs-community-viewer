import { Column, useSortBy, useTable } from 'react-table';
import { ColumnNames } from './ContributorsList';
import { Dictionary } from 'lodash';
import { GitHubLinkIcon } from '../GitHubLinkIcon';
import { Link } from 'react-router-dom';

type Data = Dictionary<string | number | Data | undefined | null>;

type Props = {
  columns: Column<Data>[],
  data: Data[],
};
export const MembersTable = ({ columns, data }: Props) => {
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
                cell.column.Header === ColumnNames.Name
                  ? <td {...cell.getCellProps()}>
                    <Link to={`contributor/${cell.row.original.login}`}>{cell.render('Cell')}</Link>
                  </td>
                  : cell.column.Header === ColumnNames.GitHubProfile
                    ? <td {...cell.getCellProps()}>
                      <GitHubLinkIcon
                        className="table-github-icon"
                        href={cell.value}
                      />
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
