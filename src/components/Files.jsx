import React from 'react';
import styled from 'styled-components';
import GroupIcon from '@mui/icons-material/Group';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';
import SkeletonElement from './SkeletonElement';

function Files() {
    console.log("Files")
    const [users, loading, error] = useCollection(db.collection('users'))
    return (  
        <PeopleContainer>
            <PeopleHeader>
                <HeaderLeft>
                    <h4>Files</h4>
                    <FolderOpenIcon style={{fill: "#6e6e6e"}}></FolderOpenIcon>
                </HeaderLeft>
            </PeopleHeader>

            <ListContainer>
                <AddFilesRow>
                    <h4>Upload Files</h4>
                    <QueueOutlinedIcon style={{fill: "#6e6e6e"}}></QueueOutlinedIcon>
                </AddFilesRow>
                <List>
                    <Row>
                        <RowElement><SkeletonElement/></RowElement>
                        <RowElement><SkeletonElement/></RowElement>
                        <RowElement><SkeletonElement/></RowElement>
                        <RowElement><SkeletonElement/></RowElement>
                    </Row>
                    <Row>
                        <RowElement><SkeletonElement/></RowElement>
                        <RowElement><SkeletonElement/></RowElement>
                        <RowElement><SkeletonElement/></RowElement>
                        <RowElement><SkeletonElement/></RowElement>
                    </Row>
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
    height: 100%;
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
    height: 100%;
    width: 100%;
    border-top: 1px solid lightgrey;
    padding-top: 20px;
`

const AddFilesRow = styled.div`
    padding-left: 10px;
    display: flex;
    border-radius: 6px;
    border: 1px dashed var(--medium-grey);
    height: 60px;
    align-items: center;
    margin-bottom: 20px;
    > h4 {
        margin-right: 10px;
        font-weight: 400;
        color: var(--medium-grey);
    }
    /* :hover {
        background-color: #edebeb;
    } */
`

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
`

const RowElement = styled.div`
    flex-grow: 0;
    width: 20%;
    height: 180px;
    /* background-color: #edebeb; */
`
