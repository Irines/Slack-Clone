import React from 'react';
import './App.css';
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header';
import Chat from './components/Chat';
// import AppBody from './components/AppBody';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className="app">
      <Router>
        <>
          <Header/>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
              <AppBody>
                <SideBar/>
                <Routes>
                  <Route path="/" element={<Chat/>}>
                    {/* <Home /> */}
                  </Route>
                </Routes>
              </AppBody>
        </>
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  height: 100vh;
  display: flex;
`
