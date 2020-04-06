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
        if(sessionStorage.getItem('name')){    
                socket.emit('setName',sessionStorage.getItem('name'));
        }
       
        socket.on('getRooms',({rooms})=>{
            setRooms(rooms);
        })
        
        
        if(querystring.parse(location.search).room!=null){
            socket.emit('addUserToRoom',querystring.parse(location.search).room);
        } 
           
        
    },[])
    
    useEffect(()=>{  
        setRoom(rooms.find(r => r.id == querystring.parse(location.search).room));
        if(room!=null){
            socket.emit('addUserToRoom',room.id);
        }
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
                    <ChatBox room={room} messages={room ==null? null : room.messages} socket={socket}/>
                </div>
                
            </main>
        )
}
            
     
    
    
