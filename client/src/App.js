import { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import SignUp from './pages/Signup';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {/* <BrowserRouter>
        <Routes>
          <Route path='/login' element={loggedIn ? <Home /> : <Login onLogin={setLoggedIn} />} />
          <Route path='/signup' element={loggedIn ? <Home /> : <SignUp onSignUp={setLoggedIn} />} />
          <Route path='/' element={loggedIn ? <Home /> : <Login onLogin={setLoggedIn} />}/>
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </BrowserRouter> */}
      <Home/>
    </div>
  );
}

export default App;
