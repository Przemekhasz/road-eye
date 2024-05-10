import React from 'react';
import { Route, Routes} from 'react-router-dom';
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import './App.css'

const App: React.FC = () => {
  return (
      <Routes>
          <Route path='/' element={<LoginScreen />} />
          <Route path='/dashboard' element={<Dashboard userName={'Przemek Szoszon'} lastRecordDate={'5.05.2024'} numberOfRecords={120} diskSpaceUsage={350} />} />
      </Routes>
  );
};

export default App;
