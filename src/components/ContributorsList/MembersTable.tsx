import { Dictionary } from "lodash";
import { Link } from "react-router-dom";
import { Column, useTable, useSortBy } from "react-table";
import { ColumnNames } from "./ContributorsList";

type Data = Dictionary<string | number | Data | undefined | null>;

type Props = {
  columns: Column<Data>[],
  data: Data[],
};
export const MembersTable = ({ columns, data }: Props) => {
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
                  cell.column.Header === ColumnNames.Name
                  ? <td {...cell.getCellProps()}>
                      <Link to={`contributor/${cell.row.original.id}`}>{cell.render('Cell')}</Link>
                    </td>
                  : cell.column.Header === ColumnNames.GitHubProfile
                    ? <td {...cell.getCellProps()}>
                        <a href={cell.value} target="_blank" rel="noreferrer">
                          <img id="github-logo" alt="GitHub logo" src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"/>
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
