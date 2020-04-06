let roomCounter = 0;
const rooms = [
    {
        "id":-1,
        "name":'firstRoom',
        "users":[{
            "id":1,
            "name":2,
        }],
        "messanges":[{
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

const createRoom =(userId,username) =>{
    
    let room = {
        id:roomCounter,
        name:`${roomCounter} room`,
        users:[],
        'messanges':[]
    }
    rooms.push(room);  
    addUserToRoom(userId,username,roomCounter);
    roomCounter++;
    
    
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

module.exports = {getRooms,createRoom,addUserToRoom};