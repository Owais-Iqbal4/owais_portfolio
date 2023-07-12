import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CreateIcon from '@mui/icons-material/Create';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import SidebarOption from '../SidebarOption/SidebarOption';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
// import { dblClick } from '@testing-library/user-event/dist/click';
import { db, collection, onSnapshot } from "../../firebase"
import { useDispatch, useSelector } from 'react-redux';

function Sidebar() {
    const user = useSelector(state=>state.user.user)
    const [channels, setChannels] = useState([]);
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) => {
            setChannels(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name
                }))
            )
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []);
    console.log('channel: ', channels)
    return (
        <div className='sidebar'>
            <div className='sidebar_header'>
                <div className="sidebar_info">
                    <h2>Slack App</h2>
                    <h3>
                        <FiberManualRecordIcon />
                        {user.displayName}
                    </h3>
                </div>
                <CreateIcon />
            </div>
            <SidebarOption Icon={InsertCommentIcon} title='Threads' />
            <SidebarOption Icon={InboxIcon} title='Mentions & reaction' />
            <SidebarOption Icon={DraftsIcon} title='Saved items' />
            <SidebarOption Icon={BookmarkBorderIcon} title='Channel browser' />
            <SidebarOption Icon={FileCopyIcon} title='People & user group' />
            <SidebarOption Icon={PeopleAltIcon} title='Apps' />
            <SidebarOption Icon={AppsIcon} title='File browser' />
            <SidebarOption Icon={ExpandLessIcon} title='Show less' />
            <hr />
            <SidebarOption Icon={ExpandMoreIcon} title='Show less' />
            <hr />
            <SidebarOption Icon={AddIcon} title='Add Channel' addChannelOption={true} />

            {
                channels.map(channel => (
                    <SidebarOption title={channel.name} id={channel.id} />
                ))
            }
        </div>
    )
}

export default Sidebar
