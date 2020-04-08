
import React,{useState,useEffect} from 'react';
import io from "socket.io-client";

import Chat from './components/Chat';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";


const ENDPOINT = 'http://localhost:5000';
export default function App(){
    const[socket,setSocket] = useState(io(ENDPOINT));

    const PrivateRoute = ({ component:Component,...rest}) =>{
        return(
            <Route {...rest} render={(props)=>{
                return(
                    sessionStorage.getItem('name')
                    ? <Component {...props} socket={socket}/>
                    :<Redirect to={{
                        pathname:'/',
                        state:{from:props.location}
                    }}/>
                )
            }}/>
        )
    }

    return (
        <Router>
        <Route
            path="/" exact
            render = {(props) =><Login {...props} socket={socket}/>}
        />
        <PrivateRoute
            path="/chat" 
            component={Chat}/>
        
        </Router>
    );
}

