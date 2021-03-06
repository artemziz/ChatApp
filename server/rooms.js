let roomCounter = 0;
const rooms = [
    {
        "id":-1,
        "name":'firstRoom',
        "users":[{
            "name":2,
        }],
        "messages":[{
            data:new Date(),
            author:'qwe',
            content:'qwe'
        }]
    }
];

const getRooms = (username) =>{
    let userRooms = [];
    rooms.forEach(room =>{
                
        if(room.users.includes(room.users.find(user =>user.name ===username))){
                     
            userRooms.push({
                id:room.id,
                name:room.name
            });
        }
    })
    
    
    return userRooms;
}
const getMessages = (curRoom) =>{
    let room = rooms.find(room =>room.id == curRoom);
    if(room){
        return room.messages;
    } else{
        return [];
    }
    
}
const getUsers = (curRoom) =>{
    let room = rooms.find(room =>room.id == curRoom); 
    if(room){
        return room.users;
    }else{
        return [];
    }
}
const createRoom =(username) =>{
    
    let room = {
        id:roomCounter,
        name:`${roomCounter} room`,
        users:[],
        'messages':[]
    }
    rooms.push(room);  
    addUserToRoom(username,roomCounter);
    
    return roomCounter++;
    
}

const addUserToRoom = (username,roomId) =>{
    let isFound = false;
    rooms.forEach(room =>{
                   
        if(room.id==roomId){
            if(!room.users.includes(room.users.find(user => user.name==username))){
                room.users.push({
                    name:username
                })
                isFound = true;
            }
            
        }
    })
    return isFound;
}
const addMessage = (username,roomId,message) =>{
    rooms.forEach(room =>{
        if(room.id ==roomId){
            room.messages.push({
                data:new Date(),
                author:username,
                content:message
            })
            
        }
    })
    
    
}

const deleteUserFromRoom = (username) =>{
    rooms.forEach(room =>{
        let user = room.users.findIndex(user =>user.name == username);
        if(user!==-1){
            room.users.splice(user,1);
        }
    })
}

module.exports = {getRooms,createRoom,addUserToRoom,getMessages,addMessage,getUsers,deleteUserFromRoom};