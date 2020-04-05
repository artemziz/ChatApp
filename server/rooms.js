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
                     
            userRooms.push({
                id:room.id,
                name:room.name
            });
        }
    })
    
    
    return userRooms;
}

const createRoom =(userId,username) =>{
      
    if(!userId||!username) return {error:"Некорректные данные"};
    let room = {
        id:roomCounter,
        name:`${roomCounter} room`,
        users:[{
            id:userId,
            name:username
        }],
        'messanges':[]
    }
    roomCounter++;
    rooms.push(room);
    
    
    return {room};
    
}

module.exports = {getRooms,createRoom};