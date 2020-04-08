import React,{useState,useEffect} from 'react';
import { Redirect } from "react-router-dom";

export default function Login({location,socket}){
    
    const[isLogin,setIsLogin] = useState(false);
    const [name, setName] = useState('');

    const { from } = location.state || { from: { pathname: '/chat' } };
    const handleSubmit = (event) =>{
        event.preventDefault();       
        socket.emit('login',name,({error,user}) => {
            if(error) {
              alert(error);
            }else{
                sessionStorage.setItem('name',user.name);
                
                setIsLogin(true);
            }
        });
        
    }
    if(!isLogin){
        return(
            <div className='container'>
                <form onSubmit={handleSubmit} className="Login">
                    
                        <div className='Login-header'>
                            <h1>Войти</h1>
                        </div>
                        <div className='Login-name'>
                            <input placeholder="Введите ваше имя..."  type="text" onChange={(event) => setName(event.target.value)} />
                        </div>
                        <div className='Login-submit'>
                            <input type="submit" value="Отправить" />
                        </div>

                    
                </form>
            </div>
        )
    }else{
        return(
            <Redirect to={from}/>
        )
    }
    
}