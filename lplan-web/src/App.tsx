import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import of Pages ...
import Home from './pages/home.page/home.page';
import Login from './pages/login.page/login.page';
import Register from './pages/register.page/register.page';
import Feed from './pages/feed.page/feed.page';
import Discovery from './pages/discovery.page/discovery.page';
import Messages from './pages/messages.page/messages.page';
import CalendarEvents from './pages/calendarevents.page/calendarevents.page';
import Profile from './pages/profile.page/profile.page';
import PageNotFound from './pages/pagenotfound.page/pagenotfound.page';

// Import of Components ...
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='feed' element={<Feed />} />
          <Route path='discovery' element={<Discovery />} />
          <Route path='messages' element={<Messages />} />
          <Route path='calendarevents' element={<CalendarEvents />} />
          <Route path='profile' element={<Profile />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;