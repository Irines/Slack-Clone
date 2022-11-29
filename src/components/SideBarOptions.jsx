import { Icon } from '@mui/material';
import React, { useCallback, useState } from 'react';
import styled from "styled-components";
import { db } from '../firebase';
import { useDispatch } from 'react-redux'
import { enterRoom } from '../features/appSlice';
import { Link } from 'react-router-dom';
import { CreateChannelModal } from './modals/CreateChannelModal';

function SideBarOptions({Icon, title, addChannelOption, id, isChannelOption, handleChannelsShowClick, handleShowLessClick, showLessOption, isPeopleOption,isFilesOption}) {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);

    const openCreateChannelModal = (params) => {
        setOpenModal(true)
    }

    const handleNameEdit = useCallback((channelName) => {
        if (channelName) {
            db.collection('rooms').add({
                name: channelName
            })
        }
        setOpenModal(false)
    }, [])

    const SelectChannel = (params) => {
        // on Select we push the roomId into the redux store
        if (id) {
            dispatch(enterRoom({
                roomId: id
            }))
        }
    }

    const openChannels = () => {
        handleChannelsShowClick();
    }

    const showLessChannels = () => {
        handleShowLessClick();
    }

    return (  
        <>
            <CreateChannelModal open={openModal} setOpen={setOpenModal} handleNameEdit={handleNameEdit}/>
            <SideBarOptionsContainer onClick={showLessOption ? showLessChannels : isChannelOption ? openChannels : addChannelOption ? openCreateChannelModal : SelectChannel}>
                {Icon && !isPeopleOption && !isFilesOption && <Icon fontSize="small" style={{padding: 10}} /> }
                {
                    isPeopleOption ?
                        <Link to={`/people`}>
                            <Icon fontSize="small" style={{padding: 10}} />
                            <h3>{title}</h3>
                        </Link>
                    :
                        isFilesOption ? 
                            <Link to={`/files`}>
                                <Icon fontSize="small" style={{padding: 10}} />
                                <h3>{title}</h3>
                            </Link>
                        :
                            Icon 
                            ?
                                (<h3>{title}</h3>)
                            :
                                (
                                    <SideBarOptionChannel>
                                        <span>#</span> <Link to={`/`}>{title}</Link>
                                    </SideBarOptionChannel>
                                )
                }
            </SideBarOptionsContainer>
        </>
    );
}

export default SideBarOptions;

const SideBarOptionsContainer = styled.div`
    padding-left: 2px;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;

    > a {
        display: flex;
        align-items: center;
    }

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
const SideBarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight: 300;

`