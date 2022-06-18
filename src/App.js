import Login from './pages/login/Login';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/register/Register';
import UserList from './pages/user_list/UserList';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-list" element={<UserList />} />
      </Routes>
    </div>
  );
}

export default App;
