
import React,{useState,useEffect} from 'react';
import io from "socket.io-client";

import Chat from './components/Chat';
import Login from './components/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";


const ENDPOINT = 'http://localhost:5000';
export default function App(){
    const[socket,setSocket] = useState(io(ENDPOINT));
    const getSocket = (socketId) =>{
        if (io && io.sockets && io.sockets.sockets) {
            let sockets = io.sockets.sockets;
            let socket = null;
    
            if (sockets.length) {
                for (let i = 0; i < sockets.length; i++) {
                    let _socket = sockets[i];
    
                    if (_socket.id && _socket.id === socketId) {
                        socket = _socket;
                        break;
                    }
    
                }
            }
    
            return socket;
        }
    }
    
    
    return (
        <Router>
        <Route
            path="/" exact
            render = {(props) =><Login {...props} socket={socket}/>}
        />
        <Route
            path="/chat" 
            render = {(props) =><Chat {...props} socket={socket}/>}
        />
        </Router>
    );
}

