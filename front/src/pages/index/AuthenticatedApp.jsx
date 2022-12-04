import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import Profile from '../profile/Profile';
import { FilterProvider } from '../../contexts/FilterContext';

export default function AuthenticatedApp() {
  return (
    <FilterProvider>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </FilterProvider>
  );
}
