import React from 'react';
import styled from "styled-components";
import {Avatar} from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/Help';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
function Header() {
    const [user] = useAuthState(auth);
    return (  
        <HeaderComponent>
            <HeaderLeft>
                <HeaderAvatar
                    onClick={() => auth.signOut()} 
                    src={user?.photoURL}
                    alt={user?.displayName}
                />
                <AccessTimeIcon></AccessTimeIcon>
            </HeaderLeft>
            <HeaderSearch>
                <SearchIcon></SearchIcon>
                <input placeholder="Search something"></input>
            </HeaderSearch>
            <HeaderRight>
                <HelpIcon></HelpIcon>
            </HeaderRight>
        </HeaderComponent>
    );
}

export default Header;

const HeaderComponent = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    color:white;
    background-color: var(--slack-color);
    justify-content: space-between;
    padding: 10px 0px;
`
const HeaderLeft = styled.div`
    flex: 0.3;
    display: flex;
    align-items: center;
    margin-left: 20px;
    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 30px;
    }
`
const HeaderAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`
const HeaderSearch = styled.div`
    flex: 0.4;
    opacity: 1;
    border-radius: 6px;
    display: flex;
    text-align: center;
    padding: 0 50px;
    color: grey;
    border: 1px solid grey;
    background-color: #6d3b75;
    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        outline: 0;
        color:white;
        min-width: 30vw;
    }
`
const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: flex-end;
    > .MuiSvgIcon-root {
        margin-left: auto;
        margin-right: 20px;
    }
`