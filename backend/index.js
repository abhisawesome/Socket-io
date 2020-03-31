const express = require("express");
const app = express();
const port = 3001;
var server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require("cors");

app.use(cors());
// For connection
io.on("connection",(client)=>{
    //sending message when connected
    client.emit("message", "Connected to server")
    // Receive message on the channel
    client.on('message',(data)=>{
        console.log('Message from the client:',data)
        //Send message
        client.emit("message","Hai From server")
        //Settimeout is used for sending the another message after 4s
        setTimeout(()=>{
            client.emit('message',"How are you?")
        },4000)
    })
})
server.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
);
