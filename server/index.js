const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const {addUser,removeUser,getUser} = require('./users');
const {getRooms,createRoom,addUserToRoom,getMessages,addMessage,getUsers} = require('./rooms');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

io.on('connection',(socket) =>{
    let currentName;
    let currentRoom;
    socket.on('setName',name =>{
        currentName = name;
        
        socket.emit('getRooms',{rooms:getRooms(currentName)});
    })
    socket.on('setRoom',room =>{
        currentRoom = room;
        socket.join(currentRoom);
        socket.emit('getMessages',{messages:getMessages(currentRoom)});
        socket.emit('getUsers',{users:getUsers(currentRoom)});
    })
    socket.on('login',( name , callback) =>{
               
       const {error,user} = addUser({name:name});
        if(!error) currentName = name;
    
       return callback({error,user});
    })
    socket.on('getUser',(callback)=>{
        const user = getUser(currentName);      
        callback(user);

    })
    socket.emit('getRooms',{rooms:getRooms(currentName)});

    socket.on('createRoom',(callback)=>{
             
        const room = createRoom(currentName);
        socket.join(room);
        socket.emit('getRooms',{rooms:getRooms(currentName)});
        

    })
    socket.emit('getMessages',{messages:getMessages(currentRoom)});
    socket.emit('getUsers',{users:getUsers(currentRoom)});
    socket.on('addUserToRoom',(room) =>{
        console.log(room);
        console.log(currentName);
        currentRoom = room;
        let answer = addUserToRoom(currentName,room);
        console.log(answer);
        
        if(answer){
            socket.join(currentRoom);
            let messages = getMessages(currentRoom);
            messages? messages.push({
                data:new Date(),
                author:'admin',
                content:`${currentName} присоединился к чату`
            }): messages = [{
                data:new Date(),
                author:'admin',
                content:`${currentName} присоединился к чату`
            }];
    
            socket.broadcast.to(room).emit('getMessages',{messages:messages});
            socket.emit('getRooms',{rooms:getRooms(currentName)});
            socket.emit('getMessages',{messages:getMessages(currentRoom)});
            socket.emit('getUsers',{users:getUsers(currentRoom)});
            socket.broadcast.to(room).emit('getUsers',{users:getUsers(currentRoom)});
        }
        
    })
    socket.on('sendMessage',(message,room)=>{
        
        addMessage(getUser(currentName),room,message);
        socket.broadcast.to(room).emit('getMessages',{messages:getMessages(currentRoom)});
        socket.emit('getRooms',{rooms:getRooms(currentName)});
        socket.emit('getMessages',{messages:getMessages(currentRoom)});

    })
    socket.on('disconnect', () => {
        //const user = removeUser(socket.id);
    })
})




server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));