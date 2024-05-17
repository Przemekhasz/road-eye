import React from 'react';
import { Route, Routes} from 'react-router-dom';
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import './App.css'
import VideoExplorer from "./components/VideoExplorer";

const App: React.FC = () => {
  return (
      <Routes>
          <Route path='/' element={<LoginScreen />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path={'video-eksploer'} element={<VideoExplorer />} />
      </Routes>
  );
};

export default App;
