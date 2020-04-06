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
    return rooms.find(room =>room.id == curRoom).messages
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
    rooms.forEach(room =>{
                   
        if(room.id==roomId){
            if(!room.users.includes(room.users.find(user => user.name==username)))
            room.users.push({
                name:username
            })
        }
    })

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

module.exports = {getRooms,createRoom,addUserToRoom,getMessages,addMessage};