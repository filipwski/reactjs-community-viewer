import { PropsWithChildren } from "react";
import { default as Overlay } from 'react-loading-overlay-ts';
import { PacmanLoader } from "react-spinners";
import './LoadingOverlay.styles.css';

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
