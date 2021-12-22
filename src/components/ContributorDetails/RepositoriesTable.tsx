import { Table, TableProps } from 'components/Table';

const columns = [{
  Header: 'Repositories',
  columns: [
    {
      Header: 'Name',
      accessor: 'name',
      disableSortBy: true,
    },
    {
      Header: 'Description',
      accessor: 'description',
      disableSortBy: true,
    },
    {
      Header: 'Url',
      accessor: 'url',
      disableSortBy: true,
    },
  ],
}];

export const RepositoriesTable =
  // ({ data }: Pick<TableProps, 'data'>) => <Table columns={columns} data={data} />;
  <></>;
