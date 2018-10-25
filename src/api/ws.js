export const ws = new WebSocket("ws://localhost:8080", ["protocolOne", "protocolTwo"]);

ws.onopen = (event) => {
    console.log("On Open: ", event);
};

ws.onmessage = (event) => {
    console.log(event.data);
};

export default ws;