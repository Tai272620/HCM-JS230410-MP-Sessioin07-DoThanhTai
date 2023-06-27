import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import AddTask from './components/AddTask';
import ABout from './components/ABout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AddTask />}>
        </Route>
        <Route path='about' element={<ABout />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
