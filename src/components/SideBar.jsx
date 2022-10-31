import React from 'react';
import styled from "styled-components";
import CreateIcon from '@mui/icons-material/Create';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SideBarOptions from './SideBarOptions';
function SideBar() {
    return ( 
        <SideBarContainer>
            <SideBarHeader>
                <SideBarInfo>
                    <h2>Project name</h2>
                    <h3>
                        <FiberManualRecordIcon></FiberManualRecordIcon>
                        mkmknk
                    </h3>
                </SideBarInfo>
                <CreateIcon></CreateIcon>
            </SideBarHeader>
            <SideBarOptions Icon={InsertCommentIcon} title="Threads"/>
            <SideBarOptions Icon={InboxIcon} title="Mentions & reactions"/>
            <SideBarOptions Icon={DraftsIcon} title="Saved items"/>
            <SideBarOptions Icon={BookmarkBorderIcon} title="Channel browser"/>
            <SideBarOptions Icon={PeopleAltIcon} title="People & user groups"/>
            <SideBarOptions Icon={AppsIcon} title="Apps"/>
            <SideBarOptions Icon={FileCopyIcon} title="File browser"/>
            <SideBarOptions Icon={ExpandLessIcon} title="Show less"/>
            <hr/>
            <SideBarOptions Icon={ExpandMoreIcon} title="Channels"/>
            <hr/>
            <SideBarOptions Icon={AddIcon} addChannelOption title="Add channel"/>
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
        border: 1px solid #7c6380
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