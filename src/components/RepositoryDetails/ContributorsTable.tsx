import { Table, TableDictionary, TableProps, renderGitHubLinkIcon } from 'components/Table';
import { Cell } from 'react-table';

enum ColumnNames {
  Contributions = 'Contributions',
  Login = 'Login',
  GitHubProfile = 'GitHub Profile',
}

const columns = [{
  Header: 'Contributors',
  columns: [
    {
      Header: ColumnNames.Login,
      accessor: 'login',
      disableSortBy: true,
    },
    {
      Header: ColumnNames.Contributions,
      accessor: 'contributions'
    },
    {
      Header: ColumnNames.GitHubProfile,
      accessor: 'url',
      disableSortBy: true,
    },
  ],
}];

const renderCell = <T extends TableDictionary>(cell: Cell<T>) => {
  if (cell.column.Header === ColumnNames.GitHubProfile) return renderGitHubLinkIcon(cell);
};

export const ContributorsTable = <T extends TableDictionary>({ data }: Pick<TableProps<T>, 'data'>) => (
  <Table className="repositories-table" columns={columns} data={data} renderCell={renderCell} />
);
