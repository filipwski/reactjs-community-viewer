import { Routes, Route } from 'react-router-dom'; 
import './App.styles.css'
import { ContributorsList } from './components/ContributorsList';

export const App = () => (
  <Routes>
    <Route path="/" element={<ContributorsList />} />
  </Routes>
);
