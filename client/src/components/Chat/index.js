import React,{useState,useEffect} from 'react';
import io from "socket.io-client";
import { Link,Redirect } from "react-router-dom";
import Rooms from '../Rooms';
import ChatBox from '../ChatBox';
import querystring from 'query-string';

export default function Chat({location,socket}){
    
    
    const[room,setRoom] = useState(null);
    const[rooms,setRooms] = useState([]);
    
    
    
    useEffect(()=>{
        if(sessionStorage.getItem('name')){    
                socket.emit('setName',sessionStorage.getItem('name'));
        }
            
        if(querystring.parse(location.search).room){
            socket.emit('addUserToRoom',querystring.parse(location.search).room);
            
        }

        socket.on('getRooms',({rooms})=>{
            setRooms(rooms);
            if(querystring.parse(location.search).room){
                setRoom(rooms.find(r => r.id == querystring.parse(location.search).room));
                
            }
        })
        
        
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
            
                <main className='Chat'>
                    
                        <Rooms rooms={rooms} createRoom={createRoom} socket={socket}/>
                        <ChatBox location={location} room={room} socket={socket}/>
                    
                    
                </main>
            
        )
}
            
     
    
    
