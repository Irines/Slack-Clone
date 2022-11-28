import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logIn } from '../features/appSlice';
import { auth, provider } from '../firebase';

function Login() {
    const dispatch = useDispatch();

    const signIn = (e) => {
        e.preventDefault()
        auth.signInWithPopup(provider)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("user logged in", user)
            console.log("user id", user.uid)
            if (user) {
                dispatch(logIn({
                    userId: user.uid
                }))
            }
          })
          .catch((error) => {
            console.log(error)
        })
    }

    return (  
        <LoginContainer>
            <LoginInnerContainer>
                <img src="/images/slack_logo.png" alt="logo"/>
                <h1>Sign in to the app</h1>
                <p>Create channels and workspaces, communicate with your team and much more!</p>
                <Button  type="submit" onClick={signIn}>Sign in with Google</Button>
            </LoginInnerContainer>
        </LoginContainer>
    );
}

export default Login;

const LoginContainer = styled.div`
    background-color: #f8f8f8;
    height: 100vh;
    display: grid;
    place-items: center;
`
const LoginInnerContainer = styled.div`
    background-color: white;
    border-radius: 10px;
    text-align: center;
    padding: 100px;
    border: 1px #edebeb solid;
    
    > img {
        object-fit: contain;
        height: 100px;
        margin-bottom: 40px;
    }

    > button {
        margin-top: 50px;
        text-transform: inherit;
        background-color: #18873b;
        color: white;
    }

    > button:hover {
        background-color:  #2aa14f;
    }
`