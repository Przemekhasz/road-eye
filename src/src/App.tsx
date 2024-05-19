import React from 'react';
import { Route, Routes} from 'react-router-dom';
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import './App.css'
import VideoExplorer from "./components/VideoExplorer";
import RegistrationScreen from "./components/RegistrationScreen";
import UserProfileSettings from "./components/UserProfileSettings";
import NotificationList from "./components/NotificationList";
import ChatApp from "./components/ChatApp";

const App: React.FC = () => {
  return (
      <Routes>
          <Route path='/sign-in' element={<LoginScreen />} />
          <Route path='/sign-up' element={<RegistrationScreen />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='/video-eksploer' element={<VideoExplorer />} />
          <Route path='/profile' element={<UserProfileSettings />} />
          <Route path='/notifications' element={<NotificationList />} />
          <Route path='/chats' element={<ChatApp />} />
      </Routes>
  );
};

export default App;
