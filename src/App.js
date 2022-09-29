import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import TutorialList from './pages/TutorialList';
import Tutorial from './pages/Tutorial';
import AddTutorial from './pages/AddTutorial';
import Login from './pages/Login';
import Register from './pages/Register';

// Them trang 404

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className='container mt-3'>
          <Routes>
            <Route path="/" element={<TutorialList />} />
            <Route path='/add' element={<AddTutorial />} />
            <Route path="/tutorial/:id" element={<Tutorial />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
