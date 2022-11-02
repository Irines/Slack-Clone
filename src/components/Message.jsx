import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Message({message, user, userImage, timestamp}) {
    const convertTimestampToDate = (timestamp) => {
        console.log("date computition")
        return timestamp ? new Date(timestamp.seconds * 1000) : null
    }

    const [date, setDate] = useState(() => {
        const initialState = convertTimestampToDate(timestamp);
        return initialState;
    })

    const [dateFormat, setDateFormat] = useState(null)

    useEffect(()=> {
        // console.log("date", date)
        if (date) {
            let dateToFormat = date.getHours() + ':' + date.getMinutes() + ' ' + date.toDateString();
            console.log("dateFormat", dateToFormat)
            setDateFormat(date.getHours() + ':' + date.getMinutes() + ' ' + date.toDateString())
        }
    }, [date])

    return ( 
        <MessageContainer>
            <img src={userImage} alt="user image" />
            <MessageInfo>
                <h4>
                    {user}{' '}
                    <span>
                        {dateFormat}
                        {/* {new Date(timestamp?.seconds?.toDate().toUTCString())} */}
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