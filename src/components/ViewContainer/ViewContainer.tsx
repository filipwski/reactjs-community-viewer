import './ViewContainer.styles.css';
import { PropsWithChildren } from 'react';

export const ViewContainer = (props: PropsWithChildren<unknown>) => (
  <div className="view-container">
    {props.children}
  </div>
);
