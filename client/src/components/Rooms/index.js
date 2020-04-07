import React,{useState,useEffect} from 'react';
import io from "socket.io-client";
import { Link,Redirect } from "react-router-dom";


export default function Rooms({rooms,createRoom,socket}){
    
    
    return(
        
            <article className='Rooms'>
           
                <div className='Rooms-Title'>
                    <h3>Комнаты</h3>
                </div>                
                <ul className='RoomList'>
                    {rooms.map(room =>{
                        return(
                            <Link key={room.id} to={`/chat?room=${room.id}`}>
                                <div className='Room'>
                                    <li key={room.id}>
                                        {room.name}
                                    </li>
                                </div>
                                        
                            </Link>
                                    
                        )
                    })}       
                </ul>
                <div className='Room'>
                        
                            <button className='Room-btn' onClick={createRoom}>
                                Создать комнату
                            </button>
                        
                </div>
            
            </article>
            
        
    )
}