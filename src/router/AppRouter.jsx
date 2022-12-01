import { Navigate, Route, Routes } from 'react-router-dom'; 
import { Calendar } from '../calendar';

export const AppRouter = () => {

  return (
    <Routes>
          <Route path="/" element={<Calendar />} />   
    </Routes>
  )
}
