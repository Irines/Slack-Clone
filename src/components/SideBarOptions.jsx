import { Icon } from '@mui/material';
import React from 'react';
import styled from "styled-components";
import { db } from '../firebase';
import { useDispatch } from 'react-redux'
import { enterRoom } from '../features/appSlice';
import { Link } from 'react-router-dom';

function SideBarOptions({Icon, title, addChannelOption, id, isChannelOption, handleChannelsShowClick, handleShowLessClick, showLessOption, isPeopleOption}) {
    const dispatch = useDispatch();

    const addChannel = (params) => {
        const channelName = prompt("Please enter the channel name");
        if (channelName) {
            db.collection('rooms').add({
                name: channelName
            })
        }
    }

    const SelectChannel = (params) => {
        // on Select we should push the roomId into the redux store
        if (id) {
            dispatch(enterRoom({
                roomId: id
            }))
        }
    }

    const openChannels = () => {
        handleChannelsShowClick();
    }

    const showLessChannels = () => {
        handleShowLessClick();
    }

    const openPeopleContainer = (params) => {
        // change Route to People container
    }

    return (  
        <SideBarOptionsContainer onClick={isPeopleOption? openPeopleContainer : showLessOption ? showLessChannels : isChannelOption ? openChannels : addChannelOption ? addChannel : SelectChannel}>
            {Icon && <Icon fontSize="small" style={{padding: 10}} />}
            {
                isPeopleOption ?
                    <Link to={`/people`}><h3>{title}</h3></Link>
                : 
                    Icon 
                    ?
                        (<h3>{title}</h3>)
                    :
                        (
                            <SideBarOptionChannel>
                                <span>#</span> <Link to={`/`}>{title}</Link>
                            </SideBarOptionChannel>
                        )
            }
        </SideBarOptionsContainer>
    );
}

export default SideBarOptions;

const SideBarOptionsContainer = styled.div`
    padding-left: 2px;
    display: flex;
    font-size: 12px;
    cursor: pointer;
    align-items: center;

    :hover {
        opacity: 0.8;
        background-color: #411a47;
    }

    > h3 {
        font-weight: 500;
    }

    > h3 > span {
        padding: 15px;
    }
    `
const SideBarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;

`