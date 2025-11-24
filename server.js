// server.js — serves index.html AND mounts /api/ws WebSocket

import express from "express";
import http from "http";
import fs from "fs";
import path from "path";
import createWSS from "./api/ws.js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const server = http.createServer(app);

// Serve homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Load WebSocket server
const wss = createWSS(server);

// Upgrade request for WS
server.on("upgrade", (req, socket, head) => {
  if (req.url === "/api/ws") {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  } else {
    socket.destroy();
  }
});

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
}); 
