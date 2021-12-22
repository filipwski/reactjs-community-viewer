import './ContributorsList.styles.css';
import { ErrorMessage } from 'components/ErrorMessage';
import { FetchMoreButton } from 'components/FetchMoreButton';
import { LoadingOverlay } from 'components/LoadingOverlay';
import { MembersTable } from './MembersTable';
import { ViewContainer } from 'components/ViewContainer';
import { compact } from 'lodash';
import { useMembersQuery } from 'generated/graphql';

export const ContributorsList = () => {
  const { error, data, fetchMore, loading } = useMembersQuery({ notifyOnNetworkStatusChange: true });

  if (error) return <ErrorMessage message={error.message} />;

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
