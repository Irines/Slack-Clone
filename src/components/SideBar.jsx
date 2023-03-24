import React, { useCallback, useState } from 'react';
import styled from "styled-components";
import CreateIcon from '@mui/icons-material/Create';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SideBarOptions from './SideBarOptions';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MemoizedEditProjectName } from './modals/EditProjectName';
import { useEffect } from 'react';

function SideBar() {
    const [channels, loading, error] = useCollection(db.collection('rooms'))
    const [userInfo, userInfoLoading, userInfoError] = useCollection(db.collection('userInfo'))
    // get the id of project update field in order to update it on edit
    const projectNameObject = userInfo?.docs[0]
    const projectNameRef = db.collection('userInfo')?.doc(projectNameObject?.id);
    // const [projectDetails] = useDocument(db.collection('rooms').doc(projectNameObject?.id))

    const [user] = useAuthState(auth); 
    const [showChannels, setShowChannels] = useState(false);
    const [showLess, setShowLess] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [projectName, setProjectName] = useState("");

    const handleShowLessClick = () => {
        setShowLess(showLess => !showLess)
    }

    const handleChannelsShowClick = () => {
        setShowChannels(showChannels => !showChannels)
    }

    const openEditNameModal = (params) => {
        setOpenModal(openModal => !openModal)
    }

    const handleNameEdit = useCallback((editName) => {
        setProjectName(editName)
        if (projectNameObject) {
            updateFirestoreProjectName(editName)
        } else {
            db.collection('userInfo').add({
                projectName: editName
            })
        }
    }, [])

    const updateFirestoreProjectName = async (editName) => {
        // Set the "projectName" field of the collection 'userInfo'
        await updateDoc(projectNameRef, {
            projectName: editName
        });
    }

    useEffect(() => {
        if (projectNameObject?.data().projectName) {
            setProjectName(projectNameObject?.data().projectName)
        }
    }, [projectNameObject])

    return ( 
        <SideBarContainer>
            <SideBarHeader>
                <SideBarInfo>
                    <h2>{projectNameObject?.data().projectName}</h2>
                    <h3>
                        <FiberManualRecordIcon></FiberManualRecordIcon>
                        {user.displayName}
                    </h3>
                </SideBarInfo>
                <CreateIcon onClick={openEditNameModal}></CreateIcon>
                <MemoizedEditProjectName open={openModal} setOpen={setOpenModal} name={projectName} handleNameEdit={handleNameEdit}/>
            </SideBarHeader>
            {/* <SideBarOptions Icon={InsertCommentIcon} title="Threads"/>
            <SideBarOptions Icon={InboxIcon} title="Mentions & reactions"/> */}
            {/* <SideBarOptions Icon={DraftsIcon} title="Saved items"/> */}
            {/* <SideBarOptions Icon={BookmarkBorderIcon} title="Channel browser"/> */}
            <SideBarOptions Icon={PeopleAltIcon} title="People & user groups" isPeopleOption={true}/>
            {
                showLess ?
                    <SideBarOptions Icon={ExpandMoreIcon} title="Show more" showLessOption={true} handleShowLessClick={handleShowLessClick}/>
                :
                <>
                    {/* <SideBarOptions Icon={AppsIcon} title="Apps"/> */}
                    <SideBarOptions Icon={FolderOpenIcon} title="File browser" isFilesOption={true}/>
                    <SideBarOptions Icon={ExpandLessIcon} title="Show less" showLessOption={true} handleShowLessClick={handleShowLessClick}/>
                </>
            }
            
            <hr/>
            <SideBarOptions Icon={ExpandMoreIcon} title="Channels" isChannelOption={true} handleChannelsShowClick={handleChannelsShowClick}/>
            <hr/>
            <SideBarOptions Icon={AddIcon} addChannelOption title="Add channel"/>
            {
                showChannels ?
                    channels?.docs.map((doc) => (
                        <SideBarOptions key={doc.id} id={doc.id} title={doc.data().name}/>
                    ))
                : null
            }

        </SideBarContainer>
     );
}

export default SideBar;

const SideBarContainer = styled.div`
    background-color: var(--slack-color);
    color: white;
    flex: 0.3;
    margin-top: 60px;
    border-top: 1px solid #7c6380;
    max-width: 260px;

    > hr {
        margin-top: 10px;
        margin-bottom: 10px;
        border: none;
        border-bottom: 1px solid #7c6380;
    }
`
const SideBarHeader = styled.div`
    display: flex;
    border-bottom: 1px solid #7c6380;
    padding: 13px;
    > .MuiSvgIcon-root {
        padding: 8px;
        font-size: 18px;
        border-radius: 999px;
        background-color: white;
        color: #7c6380
    }

    > .MuiSvgIcon-root:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`
const SideBarInfo = styled.div`
    flex: 1;
    > h2 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 5px;
    }

    > h3 {
        display: flex;
        font-size: 13px;
        font-weight: 400;
        align-items: center;
    }

    > h3 > .MuiSvgIcon-root {
        font-size: 14px;
        margin-top: 1px;
        margin-right: 2px;
        color: green;
    }
`