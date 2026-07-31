import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "../components/Welcome";
import UserForm from "../components/UserForm";
import LoginForm from "../components/LoginForm";
import Profile from "../components/Profile";
import UsersList from "../pages/UserList";
import { UserProvider } from "../context/UserContext";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<UserForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users" element={<UsersList />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;