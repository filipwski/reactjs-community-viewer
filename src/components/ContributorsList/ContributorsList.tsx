import { useMemo } from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';
import { BounceLoader } from 'react-spinners';
import { useMembersQuery } from "../../generated/graphql";
import { Table } from '../Table';
import './ContributorsList.styles.css'

export const ContributorsList = () => {
  const { error, data, fetchMore, loading } = useMembersQuery({ notifyOnNetworkStatusChange: true });

  const columns = useMemo(() => [
    {
      Header: "Ranking of community contributors",
      columns: [
        {
          Header: "Name",
          accessor: "name",
          disableSortBy: true,
        },
        {
          Header: "Contributions",
          accessor: "contributionsCollection.contributionCalendar.totalContributions",
        },
        {
          Header: "Repositories",
          accessor: "repositories.totalCount",
        },
        {
          Header: "Gists",
          accessor: "gists.totalCount",
        },
        {
          Header: "Followers",
          accessor: "followers.totalCount",
        },
        {
          Header: "Github Profile",
          accessor: "url",
          disableSortBy: true
        },
      ],
    }
  ], []);

  if (error) return <p>{error}</p>;

  const members = data?.organization?.membersWithRole?.nodes;
  const cursor = data?.organization?.membersWithRole?.pageInfo.endCursor;

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
      active={loading}
      spinner={<BounceLoader />}
      className="overlay"
    >
      {members && (
        <div className="contributors-list-container">
          <Table columns={columns} data={members} />
          <button
            onClick={() => onFetchMoreClick()}
          >
            Fetch more
          </button>
        </div>
      )}
    </LoadingOverlay>
  );
};
