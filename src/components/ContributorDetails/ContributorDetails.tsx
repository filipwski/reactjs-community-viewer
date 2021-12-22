import './ContributorDetails.styles.css';
import { useMemberRepositoriesQuery, useSingleMemberQuery } from 'generated/graphql';
import { ErrorMessage } from 'components/ErrorMessage';
import { GitHubLinkIcon } from 'components/GitHubLinkIcon';
import { LoadingOverlay } from 'components/LoadingOverlay';
import { ViewContainer } from 'components/ViewContainer';
import { useParams } from 'react-router-dom';

export const ContributorDetails = () => {
  const { id } = useParams();
  const {
    error: singleMemberError,
    data: singleMemberData,
    loading: singleMemberLoading,
  } = useSingleMemberQuery({
    variables: { login: id ?? '' },
  });

  const {
    error: repositoriesError,
    data: repositoriesData,
    loading: repositoriesLoading,
  } = useMemberRepositoriesQuery({
    notifyOnNetworkStatusChange: true,
    variables: { login: id ?? '' },
    fetchPolicy: 'no-cache'
  });

  if (singleMemberError || repositoriesError)
    return <ErrorMessage message={(singleMemberError ?? repositoriesError!).message} />;

  const userData = singleMemberData?.user;
  const reposData = repositoriesData?.user?.repositoriesContributedTo?.nodes;

  return (
    <LoadingOverlay
      loading={singleMemberLoading || repositoriesLoading}
    >
      {userData && (
        <ViewContainer>
          <div className="details-container details-container-modifier">
            <img
              alt="User avatar"
              className="user-avatar user-avatar-modifier"
              src={userData.avatarUrl}
            />
            <div className="user-details">
              <p className="user-name">{userData.name}</p>
              <p>{userData.bio}</p>
              {userData.company && <p>Works at <b>{userData.company}</b></p>}
              <p><b>Contributions:</b> {
                userData.contributionsCollection.contributionCalendar.totalContributions
              }</p>
              <p><b>Repositories:</b> {userData.repositories.totalCount}</p>
              <p><b>Gists:</b> {userData.gists.totalCount}</p>
              <p><b>Followers:</b> {userData.followers.totalCount}</p>
              <GitHubLinkIcon
                className="github-profile-icon"
                href={userData.url}
              />
            </div>
          </div>
        </ViewContainer>
      )}
      {reposData && <p>Test</p>}
    </LoadingOverlay>
  );
};
