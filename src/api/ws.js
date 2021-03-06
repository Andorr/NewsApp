const WS_URL: string = 'wss://sys-ut-news-api.herokuapp.com'; //'ws://localhost:8080'; //'wss://sys-ut-news-api.herokuapp.com';
const ws = new WebSocket(WS_URL, ["protocolOne", "protocolTwo"]);

const PING: string = 'ping';
const AUTH: string = 'auth';

ws.onopen = () => {

    // Start sending ping every 15 seconds
    const pingInterval: IntervalID = setInterval(() => {
        if(ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify({type: PING}));
        } else {
            clearTimeout(pingInterval);
        }
        
    }, 15000);
};

//ws.oning(heartbeat);

ws.onmessage = (event: MessageEvent): void => {
    console.log(event.data);
};


ws.sendAuth = (id: string): void => {

    // If not open, send message onOpen
    if(ws.readyState !== ws.OPEN) {
        ws.open = (event) => {
            ws.send(JSON.stringify({type: AUTH, userId: id}));
        }
    } else {
        // If already open, send message
        ws.send(JSON.stringify({type: AUTH, userId: id}));
    }

    
}

export default ws;