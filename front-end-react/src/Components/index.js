import React from 'react';
import io from 'socket.io-client';

const URL = 'http://localhost:3001' ;

class Home extends React.Component
{
    // Initialize socket variable
    socket = null;
    constructor(props){
        super(props);
        this.state={
            message:''
        }
    }
    componentDidMount()
    {

        this.establishConnection();     
        this.sendMessage();
        this.receiveMessage();  
    
    }
    // To make connection with server
    establishConnection() {
        this.socket = io.connect(URL);
    }
    //Send message to server
    sendMessage()
    {
        const message = {message:"Hai from server"}
        this.socket.emit('message',message );
    }
    // Receive message from server
    receiveMessage()
    {
        this.socket.on('message', (data) => {
            this.setState({ message: data })
        })

    }

    render()
    {
    return(<div>Message From server:{this.state.message}</div>)
    }
}
export default Home;