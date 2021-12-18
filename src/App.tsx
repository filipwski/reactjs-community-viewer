import LoadingOverlay from 'react-loading-overlay-ts';
import { BounceLoader } from 'react-spinners';
import { useMembersQuery } from "./generated/graphql";

export const App = () => {
  const { error, data, fetchMore, loading } = useMembersQuery({ notifyOnNetworkStatusChange: true });

  if (error) return <p>{error}</p>;

  const members = data?.organization?.membersWithRole?.nodes;
  const cursor = data?.organization?.membersWithRole?.pageInfo.endCursor;

  return (
    <LoadingOverlay
      active={loading}
      spinner={<BounceLoader />}
    >
      {members?.map(
        (element) => <p key={element?.id} >{element?.name}</p>
      )}
      <button
        onClick={() => {
          fetchMore({
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
          })
      }}
      >
        Fetch more
      </button>
    </LoadingOverlay>
  );
};
