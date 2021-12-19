import { compact } from 'lodash';
import { useMemo } from 'react';
import LoadingOverlay from 'react-loading-overlay-ts';
import { PacmanLoader } from 'react-spinners';
import { useMembersQuery } from "../../generated/graphql";
import { MemberTable } from './MemberTable';
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
      active={loading}
      spinner={<PacmanLoader />}
      className="overlay"
    >
      {members && (
        <div className="contributors-list-container">
          <MemberTable columns={columns} data={members} />
          <button
            onClick={() => onFetchMoreClick()}
            className="fetch-more-button"
            disabled={allMembersDownloaded}
          >
            Fetch more
          </button>
        </div>
      )}
    </LoadingOverlay>
  );
};
