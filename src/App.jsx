import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, RenameChant, Stats, StreakOverview } from './pages/index';
import Layout from "./Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/rename" element={<RenameChant />} />
          <Route path="/streak" element={<StreakOverview />} />
          <Route path="/stats" element={<Stats />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
