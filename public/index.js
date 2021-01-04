
const room = window.localStorage.getItem('room');

const url = `${window.location.protocol == 'https:' ? 'wss://' : 'ws://'}${window.location.host}`;

const socket = new WebSocket(url);

socket.onmessage = function (message) {
    const [command,value] = message.split(' ');
    
    if (command == 'create'){
        window.localStorage.setItem('room',value);
    }else if(command == 'raise'){
        
    }else if(command == 'join'){

    }
    
}

window.onload = function (){
    document.getElementById("createRoom").addEventListener("click", createRoom);
}

function createRoom (){
    const room = document.getElementById('room').value;
    socket.send(`create ${room}`);
    window.location = '/room.html';
    return;
}

function joinRoom(){
    const room = document.getElementById('room').value;
    socket.send(`join ${room}`);
    window.location = '/room.html';
    return;
}
