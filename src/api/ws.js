export const ws = new WebSocket("wss://sys-ut-news-api.herokuapp.com", ["protocolOne", "protocolTwo"]);

ws.onopen = (event) => {
    console.log("On Open: ", event);
};

ws.onmessage = (event) => {
    console.log(event.data);
};

ws.sendAuth = (id) => {
    ws.send({type: 'auth', userId: id});
}

export default ws;