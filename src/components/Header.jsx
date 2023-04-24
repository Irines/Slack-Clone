import React, { useState } from 'react';
import styled from "styled-components";
import {Avatar, Typography} from "@mui/material"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpIcon from '@mui/icons-material/Help';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Popover from '@mui/material/Popover';
import PopupBox from './modals/PopupBox';
import SearchModal from './modals/SearchModal';

function Header() {
    const [user] = useAuthState(auth);
    const [open, setOpen] = useState(false);

    const usePopup = (initialValue) => {
        const [anchorEl, setAnchorEl] = useState(initialValue);
    
        const handlePopoverOpen = (event) => {
            setAnchorEl(event.currentTarget);
        };

        const handlePopoverClose = () => {
            setAnchorEl(null);
        };
    
        return {
            anchorEl,
            handlePopoverOpen: handlePopoverOpen,
            handlePopoverClose: handlePopoverClose,
        };
    };

    const openSearchModal = (param) => {
        setOpen(param);
    }

    const popupHelp = usePopup(null)
    const popupHistory = usePopup(null)
    const popupSearch = usePopup(null)

    const openHelpPopover = Boolean(popupHelp.anchorEl);
    const openHistoryPopover = Boolean(popupHistory.anchorEl);
    const openSearchPopover = Boolean(popupSearch.anchorEl);

    return (
        <>
            <SearchModal open={open} setOpen={openSearchModal}></SearchModal>
            <HeaderComponent>
                <HeaderLeft>
                    <HeaderAvatar
                        onClick={() => auth.signOut()} 
                        src={user?.photoURL}
                        alt={user?.displayName}
                    />
                    <IconTimeWrapper         
                        onMouseEnter={popupHistory.handlePopoverOpen}
                        onMouseLeave={popupHistory.handlePopoverClose}
                    >
                        <AccessTimeIcon></AccessTimeIcon>
                    </IconTimeWrapper>
                    <PopupBox 
                        open={openHistoryPopover} 
                        handlePopoverClose={popupHistory.handlePopoverClose} 
                        anchorEl={popupHistory.anchorEl} 
                        content="History"
                    />
                </HeaderLeft>
                <HeaderSearch>
                    <SearchIcon></SearchIcon>
                    <input 
                        onMouseEnter={(event) => popupHelp.handlePopoverOpen(event)}
                        onMouseLeave={(event) => popupHelp.handlePopoverClose(event)}
                        onMouseDown={() => setOpen(true)}
                        type="text"
                        // value={search}
                        // onChange={onChangeHandler}
                        placeholder="Search in workspace"
                    ></input>
                </HeaderSearch>
                <PopupBox 
                    open={openSearchPopover} 
                    handlePopoverClose={popupSearch.handlePopoverClose} 
                    anchorEl={popupSearch.anchorEl} 
                    content="Search in the workspace"
                />
                <HeaderRight>
                    <IconHelpWrapper
                        onMouseEnter={(event) => popupHelp.handlePopoverOpen(event)}
                        onMouseLeave={(event) => popupHelp.handlePopoverClose(event)}
                    >                
                        <HelpIcon></HelpIcon>
                    </IconHelpWrapper>
                    <PopupBox 
                        open={openHelpPopover} 
                        handlePopoverClose={(event) => popupHelp.handlePopoverClose(event)}
                        anchorEl={popupHelp.anchorEl} 
                        content="Help"
                    />
                </HeaderRight>
            </HeaderComponent>
        </>  
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
    cursor: pointer;
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