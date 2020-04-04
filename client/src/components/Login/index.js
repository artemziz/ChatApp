import React,{useState,useEffect} from 'react';
import io from "socket.io-client";
import { Link,Redirect } from "react-router-dom";

export default function Login({socket}){
    
    const[isLogin,setIsLogin] = useState(false);
    const [name, setName] = useState('');

    

    const handleSubmit = (event) =>{
        event.preventDefault();       
        socket.emit('login',name,(error) => {
            if(error) {
              alert(error);
            }else{
                setIsLogin(true);
            }
        });
        
    }
    if(!isLogin){
        return(
            <form onSubmit={handleSubmit} className="Login">
                <div className='container'>
                    <div className='Login-header'>
                        <h1>Войти</h1>
                    </div>
                    <div className='Login-name'>
                        <input placeholder="Введите ваше имя..."  type="text" onChange={(event) => setName(event.target.value)} />
                    </div>
                    <div className='Login-submit'>
                        <input type="submit" value="Отправить" />
                    </div>

                </div>
            </form>
        )
    }else{
        return(
            <Redirect to='/chat'/>
        )
    }
    
}