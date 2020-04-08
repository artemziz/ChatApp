import React,{useState,useEffect} from 'react';

const getFormatDate = (date) =>{
    let time = new Date(Date.parse(date));
    return time.getHours() + ':' + time.getMinutes();
}
export default function Message({msg}){
    
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
            <div className='messageContainer' key={msg.data} >
                <div className='message'>
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
    
}