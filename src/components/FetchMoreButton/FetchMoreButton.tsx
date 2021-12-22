import './FetchMoreButton.styles.css';

type Props = {
  onClick: () => void;
  disabled: boolean;
}

export const FetchMoreButton = ({ onClick, disabled }: Props) => (
  <button
    onClick={onClick}
    className="fetch-more-button"
    disabled={disabled}
  >
    Fetch more
  </button>
);
