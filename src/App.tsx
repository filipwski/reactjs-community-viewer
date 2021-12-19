import { Routes, Route } from 'react-router-dom'; 
import './App.styles.css'
import { ContributorsList } from './components/ContributorsList';

export const App = () => (
  <>
    <header>
      <h1><span>⚛︎</span>.js Community GitHub Viewer</h1>
    </header>
    <Routes>
      <Route path="/" element={<ContributorsList />} />
    </Routes>
    <footer>
      <span>© Filip Skibiński 2021</span>
    </footer>
  </>
);
