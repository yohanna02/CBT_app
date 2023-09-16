import { Server } from "http";
import { WebSocketServer, WebSocket } from "ws";

let wss: WebSocketServer;

const initWebSocket = (server: Server) => {
    wss = new WebSocketServer({ server });

    wss.on("connection", (ws) => {
        console.log("Connected successfully");

        ws.on("message", (data) => {
            console.log(data);
        });
    });
};

export const examsStartNotificaion = (msg: string) => {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ event: "exam-start", data: msg }));
        }
    });
};


export default initWebSocket;
