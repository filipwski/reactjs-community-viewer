import { Table, TableDictionary, TableProps, renderGitHubLinkIcon, renderRouterLink } from 'components/Table';
import { Cell } from 'react-table';

enum ColumnNames {
  Contributions = 'Contributions',
  Followers = 'Followers',
  Gists = 'Gists',
  GitHubProfile = 'GitHub Profile',
  Name = 'Name',
  Repositories = 'Repositories',
}

const columns = [{
  Header: 'Ranking of community contributors',
  columns: [
    {
      Header: ColumnNames.Name,
      accessor: 'name',
      disableSortBy: true,
    },
    {
      Header: ColumnNames.Contributions,
      accessor: 'contributionsCollection.contributionCalendar.totalContributions',
    },
    {
      Header: ColumnNames.Repositories,
      accessor: 'repositories.totalCount',
    },
    {
      Header: ColumnNames.Gists,
      accessor: 'gists.totalCount',
    },
    {
      Header: ColumnNames.Followers,
      accessor: 'followers.totalCount',
    },
    {
      Header: ColumnNames.GitHubProfile,
      accessor: 'url',
      disableSortBy: true
    },
  ],
}];

const renderCell = <T extends TableDictionary>(cell: Cell<T>) => {
  switch (cell.column.Header) {
  case ColumnNames.Name:
    return renderRouterLink(cell, `contributor/${cell.row.original.login}`);
  case ColumnNames.GitHubProfile:
    return renderGitHubLinkIcon(cell);
  }
};

export const MembersTable = <T extends TableDictionary>({ data }: Pick<TableProps<T>, 'data'>) => (
  <Table columns={columns} data={data} renderCell={renderCell} />
);
