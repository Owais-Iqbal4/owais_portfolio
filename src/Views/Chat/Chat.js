import React, { useEffect, useState } from 'react'
import './Chat.css'
import { useParams } from 'react-router-dom'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { db, doc, onSnapshot, collection, query, orderBy } from "../../firebase"
import 'firebase/firestore';
import Message from '../Message/Message'
import ChatInput from '../ChatInput/ChatInput'


function Chat() {
    const { roomId } = useParams()
    const [roomDetails, setRoomDetails] = useState(null);
    const [roomMesages, setRoomMessages] = useState(null)
    useEffect(() => {
        if (roomId) {
            onSnapshot(doc(db, "rooms", roomId), (doc) => {
                setRoomDetails(doc.data())
                // console.log("chat details data: ", doc.data());
            });

        }
        const otherFunc = async () => {
            // const firestore = app.firestore();

            const subcollectionRef = query(
                collection(db, "rooms", roomId, "message"),
                orderBy("timestamp", "asc") // Replace "fieldName" with the actual field name you want to order by
            );
            const unsubscribe = onSnapshot(subcollectionRef, (querySnapshot) => {
                let messageArray = []
                querySnapshot.forEach((doc) => {
                    messageArray.push(doc.data())
                    // console.log(doc.id, " => ", doc.data());
                    // console.log('messageArray: ', messageArray)
                });
                setRoomMessages(
                    messageArray
                )
            }, (error) => {
                console.log("Error getting subcollection documents: ", error);
            });
        }
        otherFunc()
    }, [roomId])
    // console.log('roomId ', roomId)
    return (
        <div className='chat'>
            <h1>you are in {roomId} room</h1>
            <div className="chat_header">
                <div className="chat_headerLeft">
                    <h4 className='chat_channelName'>
                        <strong>{roomDetails?.name}</strong>
                        <StarBorderOutlinedIcon />
                    </h4>
                </div>
                <div className="chat_headerRight">
                    <p>
                        <InfoOutlinedIcon />
                        Details
                    </p>
                </div>
            </div>
            <div className="chat_messages">
                {roomMesages?.map(({ message, timestamp, user, userImage }) => (
                    <Message
                        message={message}
                        timestamp={timestamp}
                        user={user}
                        userImage={userImage}
                    />
                ))}
            </div>
            <ChatInput channelName = {roomDetails?.name} channelId = {roomId}/>
        </div>
    )
}

export default Chat
