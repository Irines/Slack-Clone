import React from 'react';
import styled from 'styled-components';
import GroupIcon from '@mui/icons-material/Group';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

function Files() {
    console.log("Files")
    const [users, loading, error] = useCollection(db.collection('users'))
    return (  
        <PeopleContainer>
            <PeopleHeader>
                <HeaderLeft>
                    <h4>Uploaded files</h4>
                    <FolderOpenIcon style={{fill: "#6e6e6e"}}></FolderOpenIcon>
                </HeaderLeft>
            </PeopleHeader>
            <ListContainer>
                <List>
                </List>
            </ListContainer>
        </PeopleContainer>
    );
}

export default Files;

const PeopleContainer = styled.div`
    flex: 0.7;
    overflow-y: scroll;
    flex-grow: 1;
    margin-top: 60px;
    width: 100%;
    margin-bottom: 90px;
`

const PeopleHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgrey;
`
const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    > h4 {
        font-weight: 600;
        color: var(--medium-grey);
        margin-right: 10px;
        display: flex;
        text-transform: lowercase;
    }

    > h4 > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
    }
`

const ListContainer = styled.div`
    padding: 20px;
`

const List = styled.div`
    height: 50%;
    width: 30%;
    border-radius: 6px;
    border: 1px solid lightgrey;
`

const Row = styled.div`
    padding-left: 10px;
    display: flex;
    /* border-bottom: 1px solid lightgrey; */
    height: 60px;
    align-items: center;
    font-weight: 300;
    :hover {
        background-color: #edebeb;
    }
`
