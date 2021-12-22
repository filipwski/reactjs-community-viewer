import { Cell } from 'react-table';
import { GitHubLinkIcon } from 'components/GitHubLinkIcon';
import { Link } from 'react-router-dom';
import { TableDictionary } from './Table';

export const renderGitHubLinkIcon = <T extends TableDictionary>(cell: Cell<T>) => (
  <GitHubLinkIcon
    className="table-github-icon"
    href={cell.value}
  />
);

export const renderRouterLink = <T extends TableDictionary>(cell: Cell<T>, link: string) => (
  <Link to={link}>{cell.render('Cell')}</Link>
);
