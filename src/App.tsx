import { Routes, Route } from 'react-router-dom'; 
import './App.styles.css'
import { ContributorsList } from './components/ContributorsList';

export const App = () => (
  <>
    <h1>Reactjs Community GitHub Viewer</h1>
    <Routes>
      <Route path="/" element={<ContributorsList />} />
    </Routes>
  </>
);
