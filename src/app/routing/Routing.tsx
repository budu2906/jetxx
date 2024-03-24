import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import Admin from '../../pages/admin/Admin';

const MainLayout = lazy(() => import('../../widgets/main-layout/MainLayout'));
const CrashPage = lazy(() => import('../../pages/crash-page/CrashPage'));

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path='casino/play/1play_1play_luckyjet' element={<CrashPage />} />
        </Route>
        <Route path='admin' element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
