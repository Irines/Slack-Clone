import { Button } from '@mui/material';
import React, { useRef } from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import firebase from 'firebase/compat/app';

function ChatInput({channelId, channelName}) {
    console.log("channelId",channelId)
    const inputRef = useRef(null)
    const sendMessage = (e) => {
        // default - on enter key in form page i s refreshed
        e.preventDefault()
        if(!channelId) {
            return false;
        }

        db.collection('rooms').doc(channelId).collection('messages').add({
            message: inputRef.current.value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: "Irin",
            userImage: "https://media.newyorker.com/photos/59095c67ebe912338a37455d/master/w_2560%2Cc_limit/Stokes-Hello-Kitty2.jpg"
        })

        inputRef.current.value = ""
    }
    return (
        <ChatInputContainer>
            <form>
                <input ref={inputRef} placeholder={`Message#`}></input>
                {/* in form if we have hidden button with type=submit on enter key button will be submitted */}
                <Button hidden type="submit" onClick={sendMessage}>SEND</Button>
            </form>
        </ChatInputContainer>
    );
}

export default ChatInput;

const ChatInputContainer = styled.div`
    border-radius: 20px;

    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    > form > button {
        display: none;
    }
`