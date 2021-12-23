import './App.styles.css';
import { Link, Route, Routes } from 'react-router-dom'; 
import { ContributorDetails } from 'components/ContributorDetails';
import { ContributorsList } from 'components/ContributorsList';
import { RepositoryDetails } from 'components/RepositoryDetails';

export const App = () => (
  <>
    <header>
      <h1><span>⚛︎</span>.js Community GitHub Viewer</h1>
      <span className="home-link">🏠 <Link to="/">Home</Link></span>
    </header>
    <Routes>
      <Route index element={<ContributorsList />} />
      <Route path="contributor/:id" element={<ContributorDetails />} />
      <Route path="repository/:owner/:name" element={<RepositoryDetails />} />
    </Routes>
    <footer>
      <small>© Filip Skibiński 2021</small>
    </footer>
  </>
);
