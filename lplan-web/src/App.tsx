import React from 'react';
import logo from './logo.svg';
import './App.css';

// Import of Pages ...
import home from './pages/home.page/home.page';
import login from './pages/login.page/login.page';
import register from './pages/register.page/register.page';

// Import of Components ...
import Navbar from './components/navbar/navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <p> Lplan </p>
      </header>
    </div>
  );
}

export default App;

/*

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='login' element={<LogIn />} />
        <Route path='registerUser' element={<RegisterUser />} />
        <Route path='registerOrg' element={<RegisterOrg />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='bridge2belong' element={<Main />}/>
      </Routes>
    </div>
  );
}

*/

