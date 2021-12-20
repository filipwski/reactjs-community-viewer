import './App.styles.css';
import { Route, Routes } from 'react-router-dom'; 
import { ContributorDetails } from './components/ContributorDetails';
import { ContributorsList } from './components/ContributorsList';

export const App = () => (
  <>
    <header>
      <h1><span>⚛︎</span>.js Community GitHub Viewer</h1>
    </header>
    <Routes>
      <Route index element={<ContributorsList />} />
      <Route path="contributor/:id" element={<ContributorDetails />} />
    </Routes>
    <footer>
      <small>© Filip Skibiński 2021</small>
    </footer>
  </>
);
