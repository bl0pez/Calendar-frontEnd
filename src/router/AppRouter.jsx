import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../auth/pages/Login';
import { Calendar } from '../calendar';
import { Spinner } from '../components/Spinner';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <Spinner />
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ? (
            <>
              <Route path="/auth/*" element={<Login />} />
              <Route path="/*" element={<Navigate to="/auth/login" />} />
            </>
          )
          : (
            <>
              <Route path="/" element={<Calendar />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )
      }

    </Routes>
  )
}
