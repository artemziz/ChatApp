import React,{useState,useEffect} from 'react';
import io from "socket.io-client";
import { Link,Redirect } from "react-router-dom";

export default function ChatBox({messages,room,socket}){
    const[message,setMessage] = useState('');
    
    const sendMessage = (event) =>{
        if(event.key==='Enter'){
            console.log('qwe');
            socket.emit('sendMessage',message,room.id);       
        }
    }
    
    if(room!=null){
        return(
            <article className='ChatBox'>
                {/* {messages.map(msg =>{
                    return(
                        <a>{msg.content}</a>
                    )
                })} */}
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