import './ContributorDetails.styles.css';
import { GitHubLinkIcon } from '../GitHubLinkIcon';
import { LoadingOverlay } from '../LoadingOverlay';
import { ViewContainer } from '../ViewContainer';
import { useMemberWithContributionsQuery } from '../../generated/graphql';
import { useParams } from 'react-router-dom';

export const ContributorDetails = () => {
  const { id } = useParams();
  const { error, data, fetchMore, loading } = useMemberWithContributionsQuery({
    notifyOnNetworkStatusChange: true,
    variables: { login: id ?? '' },
  });

  if (error) return <ViewContainer><p>{error.message}</p></ViewContainer>;

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