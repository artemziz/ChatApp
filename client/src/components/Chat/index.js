import React,{useState,useEffect} from 'react';
import io from "socket.io-client";
import { Link,Redirect } from "react-router-dom";
import Rooms from '../Rooms';
import ChatBox from '../ChatBox';


export default function Chat({location,socket}){
    
    const[name,setName] = useState('');
    const[room,setRoom] = useState(null);
    const[rooms,setRooms] = useState([]);
    const[redirected,setRedirected] = useState(false);
    
    const loadRooms = () =>{
        socket.emit('getRooms',(rooms)=>{
            setRooms(rooms);
        })
    }
    useEffect(()=>{
        console.log(location);
        loadRooms();
        
    },[location.search])

    useEffect(()=>{
        
        socket.emit('getUser',(user) =>{
            setName(user.name);
        })
    },[])
    const createRoom = (event) =>{
        event.preventDefault();
        socket.emit('createRoom',({ error,room })=>{
            if(error) alert(error);
            if(room) loadRooms();
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
            
     
    
    
