import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';

export function ChatroomDashboard() {

    const [chatRooms, setChatRooms] = useState([]);
    const history = useHistory();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getChatRooms();
            setSocket(io("localhost:8000"));
        } else {
            history.push('/login');
        }
    }, []);

    useEffect(() => {
        socket?.emit("joinRoom", userInfo._id);
        socket?.on("getUsers", users => {
            console.log(users)
        })
    }, [userInfo]);


    const getChatRooms = () => {
        const id = JSON.parse(localStorage.getItem('userInfo'))._id;
        axios.get(`http://localhost:8000/chatroom/getAllUsers/${id}`).then((res) => {
            if (res) {
                setChatRooms(res.data);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const getConvesationID = (receiverID) => {
        const obj = {
            "userId": userInfo._id,
            "receiverId": receiverID
        }
        axios.post("http://localhost:8000/chatroom/getConversationId", obj).then((res) => {
            if (res.data && res.data.length > 0) {
                history.push(`/chatroom/${res.data[0]._id}`)
            } else {
                // history.push(`/chatroom/}`);
            }
        })
    }

    const logout = () => {
        localStorage.clear();
        history.push('/');
    }


    return (
        <div>
            {chatRooms.map((room) => (
                <p key={room._id} onClick={() => getConvesationID(room._id)}>{room.name}</p>
            ))}

            <button onClick={() => logout()}>Logout</button>
        </div>
    )
}
