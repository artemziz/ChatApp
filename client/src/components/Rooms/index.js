import React,{useState,useEffect} from 'react';
import io from "socket.io-client";
import { Link,Redirect } from "react-router-dom";


export default function Rooms({rooms,createRoom,socket}){
    
    
    return(
        
            <article className='rooms'>
                <div className='container'>
                    <ul>
                        {rooms.map(room =>{
                            return(
                                <Link key={room.id} to={`/chat?room=${room.id}`}>
                                    <li key={room.id}>
                                        {room.name}
                                    </li>
                                </Link>
                                
                            )
                        })}
                        <li>
                            <button onClick={createRoom}>
                                Создать комнату
                            </button>
                        </li>
                    </ul>
                </div>
            </article>
            
        
    )
}