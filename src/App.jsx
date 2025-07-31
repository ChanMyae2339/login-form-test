import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./Dashboard";
import Home from "./components/Home";
import Users from "./components/Users";
import Profile from "./components/profile";
import List from "./components/List";
import CreateUser from "./components/CreateUser";
import UserDetail from "./components/UserDetail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />


        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<Users />} />
          <Route path="list" element={<List />} />
            <Route path="list/create-user" element={<CreateUser />} />
        <Route path="list/create-user/:id" element={<UserDetail />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
