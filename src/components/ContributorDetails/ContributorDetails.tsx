import './ContributorDetails.styles.css';
import { compact, set } from 'lodash';
import { ErrorMessage } from 'components/ErrorMessage';
import { FetchMoreButton } from 'components/FetchMoreButton';
import { GitHubLinkIcon } from 'components/GitHubLinkIcon';
import { LoadingOverlay } from 'components/LoadingOverlay';
import { RepositoriesTable } from './RepositoriesTable';
import { ViewContainer } from 'components/ViewContainer';
import { useGetMemberWithRepositoriesQuery } from 'generated/graphql';
import { useParams } from 'react-router-dom';

export const ContributorDetails = () => {
  const { id } = useParams();
  const { error, data, loading, fetchMore } = useGetMemberWithRepositoriesQuery({
    variables: { login: id ?? '' }
  });

  if (error) return <ErrorMessage message={error.message} />;

  const memberData = data?.user;
  const repositoriesData = compact(data?.user?.repositoriesContributedTo.nodes);
  const cursor = data?.user?.repositoriesContributedTo.pageInfo.endCursor;

  const allReposDownloaded = !cursor;

  const onFetchMoreClick = () => fetchMore({
    variables: { cursor },
    updateQuery: (previousResults, { fetchMoreResult }) => {
      const oldReposValue = previousResults.user?.repositoriesContributedTo?.nodes;
      const newReposValue = fetchMoreResult?.user?.repositoriesContributedTo?.nodes;
      
      if (!oldReposValue || !newReposValue) return previousResults;

      return set(
        { ...previousResults, ...fetchMoreResult },
        'user.repositoriesContributedTo.nodes',
        [...oldReposValue, ...newReposValue],
      );
    },
  });

  return (
    <LoadingOverlay
      loading={loading}
    >
      {memberData && (
        <ViewContainer>
          <div className="details-container details-container-modifier">
            <img
              alt="User avatar"
              className="user-avatar user-avatar-modifier"
              src={memberData.avatarUrl}
            />
            <div className="user-details">
              <span className="user-name">{memberData.name}</span>
              <span>{memberData.bio}</span>
              {memberData.company && <span>Works at <b>{memberData.company}</b></span>}
              <span><b>Contributions:</b> {
                memberData.contributionsCollection.contributionCalendar.totalContributions
              }</span>
              <span><b>Repositories:</b> {memberData.repositories.totalCount}</span>
              <span><b>Gists:</b> {memberData.gists.totalCount}</span>
              <span><b>Followers:</b> {memberData.followers.totalCount}</span>
              <GitHubLinkIcon
                className="github-profile-icon"
                href={memberData.url}
              />
            </div>
          </div>
          {repositoriesData && (
            <>
              <RepositoriesTable data={repositoriesData} />
              <FetchMoreButton disabled={allReposDownloaded} onClick={onFetchMoreClick} />
            </>
          )}
        </ViewContainer>
      )}
    </LoadingOverlay>
  );
};
