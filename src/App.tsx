import { ContributorsListView } from "./components/ContributorsListView/ContributorsListView";
import { Routes, Route } from 'react-router-dom'; 

export const App = () => (
  <Routes>
    <Route path="/" element={<ContributorsListView />} />
  </Routes>
);
