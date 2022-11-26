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
import SideBar from './components/SideBar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Spinner from "react-spinkit";
import People from './components/People';

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading){
    return(
      <Loading>
        <LoadingContents>
          <img src="/images/slack_logo_without_text.png" alt="loading"/>
          <Spinner name="ball-spin-fade-loader" color="purple" fade="none"/>
        </LoadingContents>
      </Loading>
    )
  }
  return (
    <div className="app">
      <Router>
        {
          (!user ? (
            <Login/>
          ) : (
            <>
              <Header/>
              {/* A <Switch> looks through its children <Route>s and
                  renders the first one that matches the current URL. */}
                  <AppBody>
                    <SideBar/>
                    <Routes>
                      <Route path="/" element={<Chat/>}></Route>
                      <Route path="/people" element={<People/>}></Route>
                    </Routes>
                  </AppBody>
            </>
          ))
        }  
      </Router>
    </div>
  );
}

export default App;
const Loading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vh;
`
const LoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`
const AppBody = styled.div`
  height: 100vh;
  display: flex;
`
