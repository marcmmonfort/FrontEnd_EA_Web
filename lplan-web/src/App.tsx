import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import of Pages ...
import Home from './pages/home.page/home.page';
import LoginForm from './pages/login.page/login.page';
import RegisterForm from './pages/register.page/register.page';
import Feed from './pages/feed.page/feed.page';
import Discovery from './pages/discovery.page/discovery.page';
import UserProfile from './pages/user.page/user.page';
import Messages from './pages/messages.page/messages.page';
import CalendarEvents from './pages/calendarevents.page/calendarevents.page';
import Profile from './pages/profile.page/profile.page';
import PageNotFound from './pages/pagenotfound.page/pagenotfound.page';
import SettingsPage from './pages/settings.page/settings.page';
import EditUserPage from './pages/edituser.page/edituser.page';
import UsersList from './pages/usersList.page/usersList.page';
import MapPage from './pages/map.page/map.page';
import CreateActivity from './pages/activity/createActivity.page';
import ActivitiesLocationList from './pages/listActivityByLocation/list.activity.page';
import SharedContentPage from './pages/share.page/share.page';
// Import of Components ...
import Footer from './components/footer/footer';
import { Auth } from './models/auth.model';
import './App.css';
import Navbar from './components/navbar/navbar';




function App() {
  const handleRegister = async (authData: any) => {
    // Aquí puedes enviar los datos del formulario a un servidor y procesar la respuesta
    console.log('Datos del formulario de REGISTRO:', authData);
  };
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<LoginForm onSubmit={function (auth: Auth): void {} } />} />
          <Route path='register' element={<RegisterForm onSubmit={handleRegister}/>} />
          <Route path="shared/:type/:id" element={<SharedContentPage />} />
          
          <Route path="/feed" element={<Feed />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/userList/:userId/:mode" element={<UsersList />} />
          <Route path="/profile/settings" element={<SettingsPage/>}></Route>
          <Route path="/profile/edituser" element={<EditUserPage/>}></Route>
          <Route path="/messages" element={<Messages />} />
          <Route path="/calendarevents" element={<CalendarEvents />} />
          <Route path="/map" element={<MapPage/>}></Route>
          <Route path="/createActivity" element={<CreateActivity/>}></Route> 
          <Route path='/activityloclist' element={<ActivitiesLocationList/>}></Route>         
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

/*
          RUTAS PROTEGIDAS ...

          <Route path="/feed" element={<PrivateRoute element={<Feed />} />} />
          <Route path="/discovery" element={<PrivateRoute element={<Discovery />} />} />
          <Route path="/messages" element={<PrivateRoute element={<Messages />} />} />
          <Route path="/calendarevents" element={<PrivateRoute element={<CalendarEvents />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />

          RUTAS SIN PROTEGER ...

          <Route path="/feed" element={<Feed />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/calendarevents" element={<CalendarEvents />} />
          <Route path="/profile" element={<Profile />} />
*/