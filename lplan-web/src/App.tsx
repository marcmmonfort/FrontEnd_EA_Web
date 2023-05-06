import React from 'react';
import logo from './logo.svg';
import './App.css';

// Import of Pages ...
import Home from './pages/home.page/home.page';
import Login from './pages/login.page/login.page';
import Register from './pages/register.page/register.page';
import Feed from './pages/feed.page/feed.page';
import Discovery from './pages/discovery.page/discovery.page';
import Messages from './pages/messages.page/messages.page';
import CalendarEvents from './pages/calendarevents.page/calendarevents.page';
import Profile from './pages/profile.page/profile.page';

// Import of Components ...
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';

function App() {
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
