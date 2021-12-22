import { ViewContainer } from './ViewContainer';

type Props = {
  message: string;
};

export const ErrorMessage = ({ message }: Props) => (
  <ViewContainer>
    <p style={{ color: 'azure' }}>
      {message}
    </p>
  </ViewContainer>
);
