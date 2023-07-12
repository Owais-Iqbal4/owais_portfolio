import React from 'react'
import './Header.css'
import { Avatar } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useDispatch, useSelector } from 'react-redux';

function Header() {
  const user = useSelector(state =>state.user.user)
  return (
    <div className='header'>
      <div className="header_left">
        <Avatar
          className='header_avatar'
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTimeIcon />
      </div>
      <div className="header_search">
    <SearchIcon />
    <input type="text" placeholder='Search Slack App' />
      </div>
      <div className="header_right">
    <HelpOutlineIcon />
      </div>
    </div>
  )
}

export default Header
