import './ContributorsList.styles.css';
import { ErrorMessage } from 'components/ErrorMessage';
import { FetchMoreButton } from 'components/FetchMoreButton';
import { LoadingOverlay } from 'components/LoadingOverlay';
import { MembersTable } from './MembersTable';
import { ViewContainer } from 'components/ViewContainer';
import { compact } from 'lodash';
import { useGetMembersQuery } from 'generated/graphql';

export const ContributorsList = () => {
  const { error, data, fetchMore, loading } = useGetMembersQuery({ notifyOnNetworkStatusChange: true });

  if (error) return <ErrorMessage message={error.message} />;

  const members = compact(data?.organization?.membersWithRole?.nodes);
  const cursor = data?.organization?.membersWithRole?.pageInfo.endCursor;
  const allMembersDownloaded = !cursor;

  const onFetchMoreClick = () => fetchMore({
    variables: { cursor },
    updateQuery: (previousResults, { fetchMoreResult }) => {
      const oldMembersValue = previousResults.organization?.membersWithRole.nodes;
      const newMembersValue = fetchMoreResult?.organization?.membersWithRole.nodes;
      if (!newMembersValue || !oldMembersValue) return previousResults;

      return {
        organization: {
          membersWithRole: {
            pageInfo: {
              endCursor: fetchMoreResult?.organization?.membersWithRole.pageInfo?.endCursor,
            },
            nodes: [...oldMembersValue, ...newMembersValue],
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
          <MembersTable data={members} />
          <FetchMoreButton
            onClick={onFetchMoreClick}
            disabled={allMembersDownloaded}
          />
        </ViewContainer>
      )}
    </LoadingOverlay>
  );
};
