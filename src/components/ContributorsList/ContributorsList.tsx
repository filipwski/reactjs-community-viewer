import './ContributorsList.styles.css';
import { LoadingOverlay } from '@components/LoadingOverlay';
import { MembersTable } from './MembersTable';
import { ViewContainer } from '@components/ViewContainer';
import { compact } from 'lodash';
import { useMembersQuery } from '@queries';
import { useMemo } from 'react';

export enum ColumnNames {
  Contributions = 'Contributions',
  Followers = 'Followers',
  Gists = 'Gists',
  GitHubProfile = 'GitHub Profile',
  Name = 'Name',
  Repositories = 'Repositories',
}

export const ContributorsList = () => {
  const { error, data, fetchMore, loading } = useMembersQuery({ notifyOnNetworkStatusChange: true });

  const columns = useMemo(() => [
    {
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
    }
  ], []);

  if (error) return <ViewContainer><p>{error.message}</p></ViewContainer>;

  const members = compact(data?.organization?.membersWithRole?.nodes);
  const cursor = data?.organization?.membersWithRole?.pageInfo.endCursor;
  const allMembersDownloaded = !cursor;

  const onFetchMoreClick = () => fetchMore({
    variables: { cursor },
    updateQuery: (previousResults, { fetchMoreResult }) => {
      const oldMemberValues = previousResults.organization?.membersWithRole.nodes;
      const newMemberValues = fetchMoreResult?.organization?.membersWithRole.nodes;
      if (!newMemberValues || !oldMemberValues) return previousResults;

      return {
        organization: {
          membersWithRole: {
            pageInfo: {
              endCursor: fetchMoreResult?.organization?.membersWithRole.pageInfo?.endCursor,
            },
            nodes: [...oldMemberValues, ...newMemberValues],
          }
        }
      };
    },
  });

  return (
    <LoadingOverlay
      loading={loading}
    >
      {members && (
        <ViewContainer>
          <MembersTable columns={columns} data={members} />
          <button
            onClick={onFetchMoreClick}
            className="fetch-more-button"
            disabled={allMembersDownloaded}
          >
            Fetch more
          </button>
        </ViewContainer>
      )}
    </LoadingOverlay>
  );
};
