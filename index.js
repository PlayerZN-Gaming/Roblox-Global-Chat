// index.js — Single File Global Chat Server (WebSocket API)

const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 3000;

// Create HTTP server (required for WebSockets on platforms like Railway)
const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("WebSocket Global Chat API is running.\n");
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

// Connected clients
let clients = [];

wss.on("connection", (socket) => {
    console.log("[WS] Client connected");
    clients.push(socket);

    socket.on("message", (raw) => {
        try {
            const data = JSON.parse(raw);

            // Expected format: { username, message }
            if (!data.username || !data.message) return;

            const outgoing = JSON.stringify({
                username: data.username,
                message: data.message
            });

            // broadcast to all clients
            clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(outgoing);
                }
            });
        } catch (e) {
            console.log("Invalid JSON:", e);
        }
    });

    socket.on("close", () => {
        console.log("[WS] Client disconnected");
        clients = clients.filter((c) => c !== socket);
    });
});

server.listen(PORT, () => {
    console.log("Server running on port:", PORT);
});
