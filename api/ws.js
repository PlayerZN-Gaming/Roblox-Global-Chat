// /api/ws.js — WebSocket chat server for Render

import { WebSocketServer } from "ws";

export default function createWSS(server) {
  const wss = new WebSocketServer({ noServer: true });

  wss.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("message", (raw) => {
      try {
        const data = JSON.parse(raw);

        if (!data.username || !data.message) return;

        const sendData = JSON.stringify({
          username: data.username,
          message: data.message
        });

        // broadcast to all connected
        wss.clients.forEach((client) => {
          if (client.readyState === 1) {
            client.send(sendData);
          }
        });

      } catch (err) {
        console.log("Invalid JSON:", err);
      }
    });

    socket.on("close", () => {
      console.log("Client disconnected");
    });
  });

  return wss;
}