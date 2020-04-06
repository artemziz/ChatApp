import React,{useState,useEffect} from 'react';
import io from "socket.io-client";
import { Link,Redirect } from "react-router-dom";
import Rooms from '../Rooms';
import ChatBox from '../ChatBox';
import querystring from 'query-string';

export default function Chat({location,socket}){
    
    const[name,setName] = useState('');
    const[room,setRoom] = useState(null);
    const[rooms,setRooms] = useState([]);
    const[redirected,setRedirected] = useState(false);
    
    
    useEffect(()=>{
        
        socket.on('getRooms',({rooms})=>{
            setRooms(rooms);
            console.log(location);
        })
    },[])
    useEffect(()=>{
        
        setRoom(querystring.parse(location.search).room);
    },[location.search])
    const createRoom = (event) =>{
        event.preventDefault();
        socket.emit('createRoom',({ error,room })=>{
            if(error) alert(error);
            
        })
    }
    
        return(
            <main>
                <div className='container'>
                    <Rooms rooms={rooms} createRoom={createRoom} socket={socket}/>
                    <ChatBox room={room}/>
                </div>
                
            </main>
        )
}
            
     
    
    
