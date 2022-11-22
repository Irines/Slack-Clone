import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import InfoIcon from '@mui/icons-material/Info';
import ChatInput from './ChatInput';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';
import {db } from '../firebase';
import Message from './Message';

function Chat() {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId)
    const [roomDetails] = useDocument(
        roomId && db.collection('rooms').doc(roomId)
    )
    const [roomMessages, loading] = useCollection(
        roomId && db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
    )

    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [roomId, loading])
    return (  
        <ChatContainer>
            {
               roomDetails && roomMessages && (
                <>
                    <ChatHeader>
                        <HeaderLeft>
                            <h4><strong>#{roomDetails?.data().name}</strong></h4>
                            <StarOutlineIcon></StarOutlineIcon>
                        </HeaderLeft>
                        <HeaderRight>
                            <p>
                                <InfoIcon></InfoIcon>
                                Details
                            </p>
                        </HeaderRight>
                    </ChatHeader>
                    <ChatMessages>
                        {
                            roomMessages?.docs.map((doc) => {
                                const {message, timestamp, user, userImage} = doc.data();

                                return (
                                    <Message
                                        key={doc.id}
                                        message={message}
                                        timestamp={timestamp}
                                        user={user}
                                        userImage={userImage}
                                    />
                                )
                            })
                        }
                        <ChatBottom ref={chatRef}></ChatBottom>
                    </ChatMessages>
                    <ChatInput chatRef={chatRef} channelName={roomDetails?.data().name} channelId={roomId}/>
                </>
               )
            }
        </ChatContainer>
    );
}

export default Chat;

const ChatBottom = styled.div``

const ChatContainer = styled.div`
    flex: 0.7;
    overflow-y: scroll;
    flex-grow: 1;
    margin-top: 60px;
    width: 100%;
    margin-bottom: 90px;
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