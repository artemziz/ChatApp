import React,{useState,useEffect} from 'react';
import io from "socket.io-client";
import { Link,Redirect } from "react-router-dom";
import ScrollToBottom from 'react-scroll-to-bottom';


export default function ChatBox({location,room,socket}){
    const[message,setMessage] = useState('');
    const[messages,setMessages] = useState([]);
    const sendMessage = (event) =>{
        if(event.key==='Enter'){
            socket.emit('sendMessage',message,room.id);  
            setMessage('');
        }
        
    }
    const getFormatDate = (date) =>{
        let time = new Date(Date.parse(date));
        return time.getHours() + ':' + time.getMinutes();
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
                <div className='title'>
                    <h3>{room.name}</h3>
                </div>
                <ScrollToBottom className='MessageBox'>
                    {messages.map(msg =>{
                        if(msg.author.name == sessionStorage.getItem('name')){
                            return(
                            <div className='messageContainer' key={msg.data} >
                                <div className='message ourMessage'>
                                    <div className='message-title'>
                                        <div className='message-author'>
                                            {msg.author.name}
                                        </div>
                                        <div className='message-date'>
                                            {getFormatDate(msg.data)}
                                        </div>
                                    </div>
                                    <div className='message-content'>
                                        <a>{msg.content}</a>
                                    </div>    
                                </div>
                            </div>
                                
                        )
                        }else{
                            return(
                                <div className='messageContainer' key={msg.data}>
                                    <div  className='message'>
                                        <div className='message-title'>
                                            <div className='message-author'>
                                                {msg.author.name}
                                            </div>
                                            <div className='message-date'>
                                                {getFormatDate(msg.data)}
                                            </div>
                                        </div>
                                        <div className='message-content'>
                                            <a>{msg.content}</a>
                                        </div>    
                                    </div>
                                </div>
                            )
                        }
                        
                    })}
                </ScrollToBottom>
                <div className='message-input'>
                    <textarea type='text' placeholder='Введите сообщение...' onKeyPress={sendMessage} value={message} onChange={e => setMessage(e.target.value)}/>
                </div>
                
            </article>
        )
    }else{
        return(
            <article className='ChatBox'>

            </article>
        )
    }
}