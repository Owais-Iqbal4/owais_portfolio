import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import './Login.css'
import { auth, provider, signInWithRedirect } from '../../firebase'
import { getRedirectResult } from 'firebase/auth';
import { User } from '../../Store/action/userAction';
import { useDispatch } from 'react-redux';
function Login() {
    const dispatch = useDispatch()
    const Signin = async () => {
        signInWithRedirect(auth, provider);
    }
    getRedirectResult(auth)
        .then((result) => {
            console.log(result.user);
            dispatch(User(result.user))
        })
        .catch((error) => {
            console.error(error);
        });
    return (
        <div className='login'>
            <div className="login_container">
                <img src="https://t4.ftcdn.net/jpg/04/60/71/01/240_F_460710131_YkD6NsivdyYsHupNvO3Y8MPEwxTAhORh.jpg" alt="" />
                <h1>Sign in to Slack Clone</h1>
                <Button onClick={Signin}>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login
