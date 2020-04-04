const users = []


const addUser = ({id,name}) =>{
       
    const existingUser = users.find((user) => user.name === name);

    if(!name) return {error:"Введите ваше имя"};

    if(existingUser) return {error:"Пользователь с таким именем уже существует"};

    const user = {id,name:name};
    users.push(user);
    
    
    return {user};

}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    console.log(index);
    
    if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

module.exports = {addUser,removeUser,getUser};