import React from 'react';

import { Link } from "react-router-dom";
import image from './11-512.webp';

export default function Rooms({rooms,createRoom}){
    
    
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
                                    <div className='Room-icon'>
                                        <img src={image}/>
                                    </div>
                                    <li key={room.id}>
                                        {room.name}
                                    </li>
                                </div>
                                        
                            </Link>
                                    
                        )
                    })}       
                </ul>
                <div className='CreateRoom'>
                        
                            <button className='CreateRoom-btn' onClick={createRoom}>
                                Создать комнату
                            </button>
                        
                </div>
            
            </article>
            
        
    )
}