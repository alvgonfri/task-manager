import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/user/RegisterPage";
import LoginPage from "./pages/user/LoginPage";
import ProfilePage from "./pages/user/ProfilePage";
import TasksPage from "./pages/task/TasksPage";
import TaskPage from "./pages/task/TaskPage";
import TaskFormPage from "./pages/task/TaskFormPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="bg-slate-50 h-screen pt-24">
      <AuthProvider>
        <TaskProvider>
          <BrowserRouter>
            <Navbar />
            <main className="container mx-auto px-10">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/tasks/:id" element={<TaskPage />} />
                  <Route path="/tasks/create" element={<TaskFormPage />} />
                  <Route path="/tasks/update/:id" element={<TaskFormPage />} />
                </Route>
              </Routes>
            </main>
          </BrowserRouter>
        </TaskProvider>
      </AuthProvider>
    </main>
  );
}

export default App;
