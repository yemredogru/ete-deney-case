import './App.css';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import CompanyPage from './pages/Companies';
import Sidebar from './components/common/Sidebar';
import ProductPage from './pages/Products';
import SignUp from './components/auth/Register';
import HomePage from './pages/Home';
import { useSelector } from 'react-redux';

function App() {
  const isAuthenticated = useSelector(state => state.auth);
  console.log(isAuthenticated)
  return (
    
    <Router>
      <div className="App" >

        <Routes>
          <Route element={""}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={""}>
            <Route path="/register" element={<SignUp />} />
          </Route>
          
          {isAuthenticated.loggedIn ? (
            <>
            <Route >
            <Route path="/" element={<><Sidebar /><HomePage /></>} />
          </Route>
              <Route >
              <Route path="/company" element={<><Sidebar /><CompanyPage /></>} />
            </Route>
            <Route >
            <Route path="/products" element={<><Sidebar /><ProductPage /></>} />
          </Route>

          </>
          
            ) : (
              <Route path='*' element={<Navigate to="/login" replace={true} />} />
            )}
            

         
        </Routes>
      </div>
    </Router>
  );
}


export default App;

