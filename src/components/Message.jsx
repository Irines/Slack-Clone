import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Message({message, user, userImage, timestamp}) {
    const [dateFormat, setDateFormat] = useState(null)

    useEffect(()=> {
        console.log('useeffect + timestamp', timestamp)
        if (timestamp) {
            let date = new Date(timestamp.seconds * 1000)
            let dateToFormat = date.getHours() + ':' + date.getMinutes() + ' ' + date.toDateString();
            console.log("dateFormat", dateToFormat)
            setDateFormat(date.getHours() + ':' + date.getMinutes() + ' ' + date.toDateString())
        }
    }, [timestamp])

    return ( 
        <MessageContainer>
            <img src={userImage} alt="user image" />
            <MessageInfo>
                <h4>
                    {user}{' '}
                    <span>
                        {dateFormat}
                    </span>
                </h4>
                <p>{message}</p>
            </MessageInfo>
        </MessageContainer>
    );
}

export default Message;

const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;

    > img {
        height:50px;
        border-radius: 8px;
    }
`
const MessageInfo = styled.div`
    padding-left: 10px;

    > h4 >span {
        color: gray;
        font-weight: 300;
        margin-left: 4px;
        font-size: 12px;
    }
`