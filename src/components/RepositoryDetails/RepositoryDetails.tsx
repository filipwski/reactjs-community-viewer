import { useEffect, useState } from 'react';
import { ContributorsTable } from './ContributorsTable';
import { FetchMoreButton } from 'components/FetchMoreButton';
import { LoadingOverlay } from 'components/LoadingOverlay';
import { ViewContainer } from 'components/ViewContainer';
import { isEmpty } from 'lodash';
import { useFetch } from 'hooks';
import { useParams } from 'react-router-dom';

export const RepositoryDetails = () => {
  const { owner, name } = useParams();
  const [page, setPage] = useState(1);
  const [contributorsData, setContributorsData] = useState([]);

  // at the moment the GraphQL API doesn't allow to get contributors
  // TODO: Rewrite it to a GraphQL query
  const { loading, data } = useFetch(
    `https://api.github.com/repos/${owner}/${name}/contributors?page=${page}`,
  );

  useEffect(() => {
    setContributorsData((previousData) => [...previousData, ...data]);
  }, [data]);

  const onFetchMoreClick = () => {
    setPage((previousValue) => previousValue + 1);
  };

  const allContributorsDownloaded = isEmpty(data);

  return (
    <LoadingOverlay loading={loading}>
      <ViewContainer>
        <ContributorsTable data={contributorsData} />
        <FetchMoreButton onClick={onFetchMoreClick} disabled={allContributorsDownloaded} />
      </ViewContainer>
    </LoadingOverlay>
  );
};
