import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Settings from "./Settings";
import Users from "./Users";
import Profile from "./profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<Users />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
