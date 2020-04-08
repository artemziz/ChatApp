import React,{useState,useEffect} from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Message';
import Users from '../Users';


export default function ChatBox({room,socket}){
    const[message,setMessage] = useState('');
    const[messages,setMessages] = useState([]);
    const[curUsers,setUsers] = useState([]);
    const[showUsers,setShowUsers] = useState(false);
    const sendMessage = (event) =>{
        if(event.key==='Enter'){
            socket.emit('sendMessage',message,room.id);  
            setMessage('');
        }
        
    }
    const OnshowUsers =(event) =>{
        event.preventDefault();
        setShowUsers(true);

    }
    const CloseUsers = (event)=>{
        event.preventDefault();
        setShowUsers(false);
    }
    const UsersPanel = showUsers?<Users CloseUsers={CloseUsers} users={curUsers}/>:null;
    useEffect(()=>{
        socket.on('getMessages',({messages})=>{
            
            setMessages(messages);
            
        })
        socket.on('getUsers',({users})=>{
            console.log(users);
            
            setUsers(users);
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
                {UsersPanel}
                <header className='ChatBox-header'>
                    <div className='title'>
                        <h3>{room.name}</h3>
                    </div>
                    <div className='ChatBox-users'>
                        <a className='Users-btn' onClick={OnshowUsers}>{curUsers.length} в сети</a>
                    </div>
                </header>
                
                <ScrollToBottom className='MessageBox'>
                    {messages.map(msg =>{
                        
                            return(
                            <Message msg={msg}/>
                                
                        )
                        
                        
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