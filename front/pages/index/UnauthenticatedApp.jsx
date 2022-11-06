import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../login/Login';
import Register from '../register/Register';

export default function UnautheticatedApp() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="registro" element={<Register />} />
      <Route path="*" element={<Navigate to="login" replace />} />
    </Routes>
  );
}
