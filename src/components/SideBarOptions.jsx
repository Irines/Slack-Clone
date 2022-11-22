import { Icon } from '@mui/material';
import React from 'react';
import styled from "styled-components";
import { db } from '../firebase';
import { useDispatch } from 'react-redux'
import { enterRoom } from '../features/appSlice';

function SideBarOptions({Icon, title, addChannelOption, id, isChannelOption, onChannelArrowClick}) {
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
        onChannelArrowClick();
    }

    return (  
        <SideBarOptionsContainer onClick={isChannelOption ? openChannels : addChannelOption ? addChannel : SelectChannel}>
            {Icon && <Icon fontSize="small" style={{padding: 10}} />}
            {
                Icon 
                ?
                    (<h3>{title}</h3>)
                :
                    (<SideBarOptionChannel>
                        <span>#</span> {title}
                    </SideBarOptionChannel>)
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