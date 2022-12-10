import { Navigate, Route, Routes } from 'react-router-dom'; 
import { Login } from '../auth/pages/Login';
import { Calendar } from '../calendar';

export const AppRouter = () => {

  return (
    <Routes>
          {/* <Route path="/" element={<Calendar />} />    */}

          <Route path="/auth/login" element={<Login />} />

    </Routes>
  )
}
