import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Message({message, user, userImage, timestamp}) {
    const [dateFormat, setDateFormat] = useState(null)

    useEffect(()=> {
        if (timestamp) {
            let date = new Date(timestamp.seconds * 1000)
            let dateToFormat = date.getHours() + ':' + date.getMinutes() + ' ' + date.toDateString();
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
    align-items: flex-start;
    padding: 20px;

    > img {
        height:50px;
        border-radius: 8px;
    }
`
const MessageInfo = styled.div`
    padding-left: 10px;
    min-height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > h4 {
        color: var(--medium-grey);
        font-weight: 600;
        margin-bottom: 10px;
    }

    > h4 >span {
        color: gray;
        font-weight: 300;
        margin-left: 4px;
        font-size: 12px;
    }

    >p {
        color: #616061;
        font-weight: 400;
    }
`