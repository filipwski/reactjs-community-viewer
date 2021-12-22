import './ContributorDetails.styles.css';
import { ErrorMessage } from '@components/ErrorMessage';
import { GitHubLinkIcon } from '@components/GitHubLinkIcon';
import { LoadingOverlay } from '@components/LoadingOverlay';
import { ViewContainer } from '@components/ViewContainer';
import { useParams } from 'react-router-dom';
import { useSingleMemberQuery } from '@queries';

export const ContributorDetails = () => {
  const { id } = useParams();
  const { error, data, fetchMore, loading } = useSingleMemberQuery({
    notifyOnNetworkStatusChange: true,
    variables: { login: id ?? '' },
  });

  if (error) return <ErrorMessage message={error.message} />;

  const userData = data?.user;

  return (
    <LoadingOverlay
      loading={loading}
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
    </LoadingOverlay>
  );
};
