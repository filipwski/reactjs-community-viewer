import LoadingOverlay from 'react-loading-overlay-ts';
import { BounceLoader } from 'react-spinners';
import { useMembersQuery } from "../../generated/graphql";
import './ContributorsList.styles.css'

export const ContributorsList = () => {
  const { error, data, fetchMore, loading } = useMembersQuery({ notifyOnNetworkStatusChange: true });

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
      <div className="contributors-list-container">
        {members?.map(
          (element) => <p key={element?.id} >{element?.name}</p>
        )}
        <button
          onClick={() => onFetchMoreClick()}
        >
          Fetch more
        </button>
      </div>
    </LoadingOverlay>
  );
};
