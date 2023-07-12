import './ChatInput.css'
import React, { useState } from 'react'
import { collection, doc, addDoc, db, serverTimestamp } from '../../firebase';
import { useSelector } from 'react-redux';

function ChatInput({ channelName, channelId }) {
    const user = useSelector(state => state.user.user)

    const [input, setInput] = useState('')
    const sendMessage = (e) => {
        e.preventDefault();
        if (channelId) {

            addMessageToRoom(channelId)
        }
    }
    const addMessageToRoom = async (channelId) => {
        const messagesRef = collection(db, 'rooms', channelId, 'message');
        if (user) {
            console.log('message write')
            try {
                await addDoc(messagesRef, {
                    message: input,
                    user: user?.displayName,
                    userImage: user?.photoURL,
                    timestamp: serverTimestamp() // Assuming you want to add a timestamp property
                });
                console.log('Message added successfully!');
            } catch (error) {
                console.error('Error adding message:', error);
            }
        }
        else {
            console.error('Error adding message: User is undefined');
        }
    };
    return (
        <div className='chatInput'>
            <form >
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message #${channelName}`} />
                <button type='submit' onClick={sendMessage}> SEND</button>
            </form>
        </div>
    )
}

export default ChatInput
