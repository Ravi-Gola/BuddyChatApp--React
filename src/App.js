import './App.css';
import Home from './pages/Home';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const {currentUser}=useContext(AuthContext);
  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to='/login'/>
    }
    return children;
  }
  return (
    <div className="app">
     <BrowserRouter>
     <Routes>
      <Route exact path='/' element={<ProtectedRoute>
        <Home/>
      </ProtectedRoute>}/>
      <Route exact path='/login' element={<Login key={'login'}/>}/>
      <Route exact path='/register' element={<Register key={'register'}/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
