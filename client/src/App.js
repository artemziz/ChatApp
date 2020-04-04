
import React,{useState,useEffect} from 'react';
import io from "socket.io-client";

import Chat from './components/Chat';
import Login from './components/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";


const ENDPOINT = 'http://localhost:5000';
export default function App(){
    const[socket,setSocket] = useState(io(ENDPOINT));

    
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

