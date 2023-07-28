import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/user/RegisterPage";
import LoginPage from "./pages/user/LoginPage";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<h1>Profile</h1>} />
        <Route path="/tasks" element={<h1>Tasks</h1>} />
        <Route path="/tasks/create" element={<h1>New task</h1>} />
        <Route path="/tasks/:id" element={<h1>Task</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
