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
                <IconTimeWrapper>
                    {/* TODO: check on hover icon design */}
                    <AccessTimeIcon></AccessTimeIcon>
                </IconTimeWrapper>
            </HeaderLeft>
            <HeaderSearch>
                <SearchIcon></SearchIcon>
                <input placeholder="Search something"></input>
            </HeaderSearch>
            <HeaderRight>
                <IconHelpWrapper>                
                    <HelpIcon></HelpIcon>
                </IconHelpWrapper>
            </HeaderRight>
        </HeaderComponent>
    );
}

export default Header;

const IconHelpWrapper = styled.div`
    background-color: var(--slack-color);
    height: 26px;
    width: 26px;
    border-radius: 6px;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 20px;
    :hover {
        opacity: 1;
        background-color: var(--slack-lighter);
    }
`

const IconTimeWrapper = styled.div`
    margin-left: auto;
    margin-right: 20px;
    margin-left: auto;
    background-color: var(--slack-color);
    height: 26px;
    width: 26px;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    :hover {
        opacity: 1;
        background-color: var(--slack-lighter);
    }
`

const HeaderComponent = styled.div`
    display: flex;
    position: fixed;
    height: 40px;
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
`
const HeaderAvatar = styled(Avatar)`
    cursor: pointer;
    height: 26px !important;
    width: 26px !important;
    :hover {
        opacity: 0.8;
    }
`
const HeaderSearch = styled.div`
    flex: 0.4;
    opacity: 1;
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding: 0 50px;
    height: 26px;
    color: white;
    /* border: 1px solid grey; */
    background-color: var(--slack-lighter);
    > input {
        background-color: transparent;
        border: none;
        text-align: center;
        outline: 0;
        color: white;
        min-width: 30vw;
        ::placeholder {
            color: white;
        }
    }
`
const HeaderRight = styled.div`
    flex: 0.3;
    display: flex;
    align-items: flex-end;
`