import React from 'react';
import styled from 'styled-components';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import InfoIcon from '@mui/icons-material/Info';
import ChatInput from './ChatInput';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';

function Chat() {
    const roomId = useSelector(selectRoomId)
    return (  
        <ChatContainer>
            <>
                <h1>Chat screen</h1>
                <ChatHeader>
                    <HeaderLeft>
                        <h4><strong>#room-name</strong></h4>
                        <StarOutlineIcon></StarOutlineIcon>
                    </HeaderLeft>
                    <HeaderRight>
                        <p>
                            <InfoIcon></InfoIcon>
                            Details
                        </p>
                    </HeaderRight>
                </ChatHeader>
            </>
            <ChatMessages>

            </ChatMessages>
            <ChatInput channelName={null} channelId={roomId}/>
        </ChatContainer>
    );
}

export default Chat;

const ChatContainer = styled.div`
    flex: 0.7;
    overflow-y: scroll;
    flex-grow: 1;
    margin-top: 60px;
`
const ChatHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgrey;
`
const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    > h4 {
        margin-right: 10px;
        display: flex;
        text-transform: lowercase;
    }

    > h4 > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
    }
`
const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 5px;
        font-size: 16px;
    }
`

const ChatMessages = styled.div``