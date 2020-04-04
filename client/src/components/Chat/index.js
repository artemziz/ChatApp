import React,{useState,useEffect} from 'react';
import io from "socket.io-client";
import { Link,Redirect } from "react-router-dom";

export default function Chat({socket}){
    
    const[name,setName] = useState('');

    useEffect(()=>{
        
        socket.emit('getUser',(user) =>{
            setName(user.name);
        })
    },[])

    return(
        <div>
            <h1>Chat</h1>
            <a>{name}</a>
            
        </div>
    )
}