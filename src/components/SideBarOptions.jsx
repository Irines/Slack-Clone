import { Icon } from '@mui/material';
import React from 'react';
import styled from "styled-components";
import { db } from '../firebase';

function SideBarOptions({Icon, title, addChannelOption}) {
    const addChannel = (params) => {
        const channelName = prompt("Please enter the channel name");
        if (channelName) {
            db.collection('rooms').add({
                name: channelName
            })
        }
    }

    const SelectChannel = (params) => {
        
    }

    return (  
        <SideBarOptionsContainer onClick={addChannelOption ? addChannel : SelectChannel}>
            {Icon && <Icon fontsize="small" style={{padding: 10}} />}
            {
                Icon 
                ?
                    (<h3>{title}</h3>)
                :
                    (<SideBarOptionChannel>
                        <span>#{title}</span>
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
const SideBarOptionChannel = styled.div``