import React from 'react';
import image from './cancelar.png';

export default function Users({CloseUsers,users}){
    return(
        <div>
        
            <div className='Users-background'>
                <article className='Users'>
                    <div className='Users-title title'>
                        <h3>Пользователи</h3>
                        <div className='close-icon'>
                            <img onClick={CloseUsers} alt='close' src={image}/>
                        </div>
                    </div>
                    <ul className='Users-list'>
                        {users.map(user =>{
                            return(
                                <div className='User'>
                                    <li key={user.name}>{user.name}</li>
                                    <hr></hr>
                                </div>
                            ) 
                        })}
                    </ul>
                </article>
            </div>
        </div>
    )
}
