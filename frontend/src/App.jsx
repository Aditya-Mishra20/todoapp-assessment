import { AuthProvider, useAuth } from "./context/AuthContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./api/interceptors";

const AppContent = () => {
  const { user } = useAuth();

  return user ? <Dashboard /> : <><Login /><Signup /></>;
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);


export default App
