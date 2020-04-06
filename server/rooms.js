let roomCounter = 0;
const rooms = [
    {
        "id":-1,
        "name":'firstRoom',
        "users":[{
            "id":1,
            "name":2,
        }],
        "messages":[{
            data:new Date(),
            author:'qwe',
            content:'qwe'
        }]
    }
];

const getRooms = (userId) =>{
    let userRooms = [];
    rooms.forEach(room =>{
                
        if(room.users.includes(room.users.find(user =>user.id ===userId))){
                     
            userRooms.push(room);
        }
    })
    
    
    return userRooms;
}
const getMessages = (curRoom) =>{
    return rooms.find(room =>room.id == curRoom).messages
}
const createRoom =(userId,username) =>{
    
    let room = {
        id:roomCounter,
        name:`${roomCounter} room`,
        users:[],
        'messages':[]
    }
    rooms.push(room);  
    addUserToRoom(userId,username,roomCounter);
    
    return roomCounter++;
    
}

const addUserToRoom = (userId,username,roomId) =>{
    rooms.forEach(room =>{
                   
        if(room.id==roomId){
            room.users.push({
                id:userId,
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