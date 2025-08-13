import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { AdminPage } from "./pages/AdminPage";
import ResultPage from "./pages/ResultPage";
import TestPage from "./pages/TestPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/admin-page" element={<AdminPage />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
};

export default App;
