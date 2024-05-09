import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MostrarElementos from './components/MostrarEmpleados';

export default function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<MostrarElementos></MostrarElementos>}></Route>
    </Routes>
   </BrowserRouter>
  )
}
