import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/user/RegisterPage";
import LoginPage from "./pages/user/LoginPage";
import ProfilePage from "./pages/user/ProfilePage";
import TasksPage from "./pages/task/TasksPage";
import TaskFormPage from "./pages/task/TaskFormPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/tasks/create" element={<TaskFormPage />} />
            <Route path="/tasks/:id" element={<TaskFormPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
