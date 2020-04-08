import React from 'react';

const getFormatDate = (date) =>{
    let time = new Date(Date.parse(date));   
    
    let hours = (time.getHours().toString()).length == 2
                    ?time.getHours()
                    :'0'+ time.getHours()
    let minutes = (time.getMinutes().toString()).length == 2
                    ?time.getMinutes()
                    :'0'+ time.getMinutes()
    
    return hours +':' + minutes
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