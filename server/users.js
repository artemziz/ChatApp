const users = []


const addUser = ({name}) =>{
       
    const existingUser = users.find((user) => user.name === name);

    if(!name) return {error:"Введите ваше имя"};

    if(existingUser) return {error:"Пользователь с таким именем уже существует"};

    const user = {name};
    users.push(user);
    
    
    return {user};

}


const removeUser = (name) => {
    const index = users.findIndex((user) => user.name === name);
    
    if(index !== -1) users.splice(index, 1);
}

const getUser = (name) => users.find((user) => user.name === name);

module.exports = {addUser,removeUser,getUser};