import React,{useState,useEffect} from 'react';
import io from "socket.io-client";
import { Link,Redirect } from "react-router-dom";

export default function ChatBox({location,room,socket}){
    const[message,setMessage] = useState('');
    const[messages,setMessages] = useState([]);
    const sendMessage = (event) =>{
        if(event.key==='Enter'){
            socket.emit('sendMessage',message,room.id);  
            setMessage('');
        }
        
    }
    useEffect(()=>{
        socket.on('getMessages',({messages})=>{
            console.log(messages);
            setMessages(messages);
            
        })
    },[])
    useEffect(()=>{
        setMessage('');
        if(room!=null){
            socket.emit('setRoom',room.id);
            
        }
        
    },[room])
    if(room!=null){
        return(
            <article className='ChatBox'>
                {messages.map(msg =>{
                    return(
                        <a>{msg.content}</a>
                    )
                })}
                <input type='text' onKeyPress={sendMessage} value={message} onChange={e => setMessage(e.target.value)}/>
            </article>
        )
    }else{
        return(
            <article className='ChatBox'>

            </article>
        )
    }
}