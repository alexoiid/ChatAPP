const users = [];
function join(id, username, room) {
    const user ={id, username, room};

    users.push(user);
    console.log(users,"users");
    return user;
}
console.log("Where did he go? ",users);

function Current_User(id)
{
    return users.find((user) => user.id === id);
}
function Disconnect(id){
    const index = users.findIndex((user)=> user.id ===id);


if (index != -1)
{
    return users.splice(index,1)[0];
}
}
module.exports = {
    join,
    Current_User,
    Disconnect,

};