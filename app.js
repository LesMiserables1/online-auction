import express from 'express';
import websocket from 'ws';
import config from './config.js';

const app = express()

app.use(express.static('public'))
// app.use((req,res)=>res.redirect('/'))

const server = app.listen(config.port, () => console.info(`e-auction is running on port ${config.port}`));

const wss = new websocket.Server({ server });

wss.on('connection', connection);

function connection(ws) {
    ws.on('message', incoming);

    function incoming(message) {
        console.info(message)
        const [command, value, room] = message.split(' ');

        if (command === 'create') {
            ws.send(`create ${value}`);
        } else if (command === 'raise') {
            ws.send(`raise ${value} ${room}`);
        } else if (command === 'join'){
            ws.send(`join ${value}`)
        }
    }
}
