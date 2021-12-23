import { Table, TableDictionary, TableProps, renderGitHubLinkIcon, renderRouterLink } from 'components/Table';
import { Cell } from 'react-table';
import { RepositoryOwner } from '@octokit/graphql-schema';

enum ColumnNames {
  Name = 'Name',
  Description = 'Description',
  Repository = 'Repository',
}

const columns = [{
  Header: 'Repository contributions',
  columns: [
    {
      Header: ColumnNames.Name,
      accessor: 'name',
      disableSortBy: true,
    },
    {
      Header: ColumnNames.Description,
      accessor: 'description',
      disableSortBy: true,
    },
    {
      Header: ColumnNames.Repository,
      accessor: 'url',
      disableSortBy: true,
    },
  ],
}];

const renderCell = <T extends TableDictionary>(cell: Cell<T>) => {
  switch (cell.column.Header) {
  case ColumnNames.Name:
    return renderRouterLink(
      cell,
      `/repository/${
        (cell.row.original.owner as unknown as RepositoryOwner).login
      }/${
        cell.row.original.name
      }`,
    );
  case ColumnNames.Description:
    return <>{cell.value ?? 'No description available...'}</>;
  case ColumnNames.Repository:
    return renderGitHubLinkIcon(cell);
  }
};

export const RepositoriesTable = <T extends TableDictionary>({ data }: Pick<TableProps<T>, 'data'>) => (
  <Table className="repositories-table" columns={columns} data={data} renderCell={renderCell} />
);
