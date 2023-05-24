import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom'
import AllTeam from './AllTeam';
import AddTeam from './AddTeam';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' exact element={<AllTeam />} />
      </Routes>

      <Routes>
        <Route path='/addteam' exact element={<AddTeam />} />
      </Routes>

      <Routes>
        <Route path='/addteam/:id' exact element={<AddTeam />} />
      </Routes>
    </>
  );
}

export default App;
