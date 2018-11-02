export const ws = new WebSocket("wss://sys-ut-news-api.herokuapp.com", ["protocolOne", "protocolTwo"]);

ws.onopen = (event: MessageEvent) => {
    console.log("On Open: ", event);
};

ws.onmessage = (event: MessageEvent) => {
    console.log(event.data);
};

ws.sendAuth = (id: string) => {

    console.log("Sending auth: ", id);

    // If not open, send message onOpen
    if(ws.readyState !== ws.OPEN) {
        ws.open = (event) => {
            ws.send(JSON.stringify({type: 'auth', userId: id}));
        }
    } else {
        // If already open, send message
        ws.send(JSON.stringify({type: 'auth', userId: id}));
    }

    
}

export default ws;