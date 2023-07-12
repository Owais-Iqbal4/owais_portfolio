import { useState } from 'react';
import './App.css';
import Header from './Views/Header/Header';
import Sidebar from './Views/Sidebar/Sidebar';
import Chat from './Views/Chat/Chat';
import Login from './Views/Login/Login';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const user = useSelector(state => state.user.user)
  return (
    <div className="App">
      <Router>
        {
          !user ?
            <Login />
            :
            <>
              <Header />
              <div className='app_body'>
                <Sidebar />
                <Routes>
                  <Route path='/' element={<h1>ok</h1>} />
                  <Route path='/room/:roomId' element={<Chat />} />
                </Routes>
              </div>
            </>
        }

      </Router>
    </div>
  );
}

export default App;
