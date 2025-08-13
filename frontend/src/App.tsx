import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { AdminPage } from "./pages/AdminPage";
import ResultPage from "./pages/ResultPage";
import TestPage from "./pages/TestPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/admin-page" element={<AdminPage />} />
      </Routes>
      <Toaster position="top-right" />
    </BrowserRouter>
  );
};

export default App;
