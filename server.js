const express = require("express");
const app = express();
const socket = require("socket.io");
const color = require("colors");
const cors = require("cors");
const { join, Current_User, Disconnect,} = require("./tempuser");
app.use(express());
const port = 8000;
app.use(cors());
var server = app.listen(
    port,
    console.log(`Server is running on port ${port}`
    .green
    )
);
const io = socket(server);

io.on("connection",(socket) => {
    socket.on("join", ({username,roomname}) => {
       const user = join(socket.id,username,roomname);
       console.log(socket.id, "=id");
       socket.join(user.room);
       socket.emit("message", {
           userid: user.id,
           username: user.username,
           text: `Welcomem ${user.username}`,
       });
       socket.broadcast.to(user.room).emit("message",{
           userid: user.id,
           username: user.username,
           text:`${user.username} has joined the chat`,

         });
       });
       socket.on("chat",(text) =>{
           const user = Current_User(socket.id);
           io.to(user.room).emit("message",{
               userid: user.id,
               username: user.username,
               text: text,
           });
       });
       socket.on("disconnect", ()=>{
           const user = Disconnect(socket.id);
           if (user){
               io.to(user.room).emit("message",{
                   userid: user.id,
                   username: user.username,
                   text: `${user.username} has left the room`,

               });
           }
       });
     });
