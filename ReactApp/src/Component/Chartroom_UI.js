import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import io from 'socket.io-client';
import axios from 'axios';
export function Chartroom_UI({ match }) {

    const history = useHistory();
    const conversationId = match.params.id
    const [messages, setMessage] = useState([]);
    const [input, setInput] = useState('')
    // const [sendAcceptFlag, setSendAcceptFlag] = useState(false);
    const [startConversation, setStartConversation] = useState(false);
    const [socket, setSocket] = useState(null)
    // const socket = io("localhost:8000")
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        setSocket(io("localhost:8000"));
        getMessages();
    }, [])


    useEffect(() => {
        socket?.emit("joinRoom", userInfo._id);

        socket?.on("getUsers", users => {
            console.log(users)
        })

        socket?.on("getNewMessage", messageData => {
            console.log(messageData);
            setMessage([messages, ...messageData]);
        })
    }, [socket]);


    const checkConvesationFunc = (chatRoomList) => {
        const acceptObj = chatRoomList.filter((element) => element.sendAcceptFlag == false);
        return acceptObj;
    }

    const getMessages = () => {
        axios.get(`http://localhost:8000/message/get/${conversationId}`).then((res) => {
            if (res.data && res.data.length > 0) {
                setStartConversation(true);
                setMessage(res.data);
            } else {
                setStartConversation(false)
            }
        })
    }

    const back = () => {
        history.push('/dashboard')
    }

    const sendMessage = () => {
        if (input == '') {
            window.confirm("Please type something");
            return;
        }

        const obj = {
            conversationId: conversationId,
            senderId: JSON.parse(localStorage.getItem('userInfo'))._id,
            message: input
        }
        axios.post('http://localhost:8000/message/add', obj).then((res) => {
            setInput('');
            if (socket) {
                socket.emit("newMessage", res.data)
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const sendInvite = () => {
        // const requestArray =
        //     [
        //         { userId: userInfo._id, sendAcceptFlag: true },
        //         { userId: userId, sendAcceptFlag: false }
        //     ]
        // axios.post('http://localhost:8000/chatroom/create', requestArray).then((res) => {
        //     if (res) {
        //         if (socket) {
        //             socket.emit('sendInvite', {
        //                 chatroomId: res.data._id
        //             })
        //         }
        //     }
        // }).catch((err) => {
        //     console.log(err);
        // })
    }

    const acceptInvite = () => {
        const obj = {
            receiverId: userInfo._id
        }
        axios.put('http://localhost:8000/chatroom/acceptRequest', obj).then((res) => {
            if (res) {
                setStartConversation(true);
            }
        })
    }

    return (
        <div>
            {startConversation ?
                <>
                    <div>
                        {messages && messages.length > 0 ?
                            <ul>
                                {messages.map((message) => {
                                    return (
                                        <li key={message._id}>{message.message}</li>
                                    )
                                })}
                            </ul>
                            : <h1>No messages found</h1>}

                        <button onClick={() => back()}>Back to dashboard</button>
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                        <button onClick={() => sendMessage()}>Send</button>
                    </div>
                </> :
                ""
                // <>
                //     {sendAcceptFlag ? <> <button onClick={() => sendInvite()}>Send Invite</button></> : <> <button onClick={() => acceptInvite()}>Accept Invite</button></>}
                // </>
            }
        </div >
    )
}
