import './RepositoryDetails.styles.css';
import { useEffect, useState } from 'react';
import { ContributorsTable } from './ContributorsTable';
import { ErrorMessage } from 'components/ErrorMessage';
import { FetchMoreButton } from 'components/FetchMoreButton';
import { GitHubLinkIcon } from 'components/GitHubLinkIcon';
import { LoadingOverlay } from 'components/LoadingOverlay';
import { ViewContainer } from 'components/ViewContainer';
import { isEmpty } from 'lodash';
import { useFetch } from 'hooks';
import { useGetRepositoryQuery } from 'generated/graphql';
import { useParams } from 'react-router-dom';

export const RepositoryDetails = () => {
  const { owner, name } = useParams();
  const {
    data: repository,
    loading: repositoryLoading,
    error: repositoryError,
  } = useGetRepositoryQuery({ variables: { owner: owner ?? '', name: name ?? '' } });

  const [page, setPage] = useState(1);
  const [contributorsData, setContributorsData] = useState([]);

  // at the moment the GraphQL API doesn't allow to get contributors
  // TODO: Rewrite it to a GraphQL query
  const { loading, data } = useFetch(
    `https://api.github.com/repos/${owner}/${name}/contributors?page=${page}&per_page=10`,
  );

  useEffect(() => {
    setContributorsData((previousData) => [...previousData, ...data]);
  }, [data]);

  if (repositoryError) return <ErrorMessage message={repositoryError.message} />;

  const onFetchMoreClick = () => {
    setPage((previousValue) => previousValue + 1);
  };

  const repositoryData = repository?.repository;
  const allContributorsDownloaded = isEmpty(data);

  return (
    <LoadingOverlay loading={loading || repositoryLoading}>
      <ViewContainer>
        {repositoryData && (
          <div className="repository-details">
            <span className="repository-name"><b>{name}</b></span>
            <span className="">created by <b>{owner}</b></span>
            <span>{repositoryData.description}</span>
            {repositoryData.homepageUrl && repositoryData.homepageUrl !== repositoryData.url && (
              <span>
                <span>Homepage: </span>
                <b>
                  <a
                    href={repositoryData.homepageUrl}
                    className="repository-homepage-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {repositoryData.homepageUrl}
                  </a>
                </b>
              </span>
            )}
            <GitHubLinkIcon
              className="github-profile-icon"
              href={repositoryData.url}
            />
          </div>
        )}
        <ContributorsTable data={contributorsData} />
        <FetchMoreButton onClick={onFetchMoreClick} disabled={allContributorsDownloaded} />
      </ViewContainer>
    </LoadingOverlay>
  );
};
