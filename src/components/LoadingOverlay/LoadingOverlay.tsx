import './LoadingOverlay.styles.css';
import { default as Overlay } from 'react-loading-overlay-ts';
import { PacmanLoader } from 'react-spinners';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  loading: boolean;
}>;

export const LoadingOverlay = ({ children, loading }: Props) => (
  <Overlay
    active={loading}
    spinner={<PacmanLoader />}
    className="overlay"
  >
    {children}
  </Overlay>
);
