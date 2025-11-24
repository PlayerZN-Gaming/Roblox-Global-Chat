export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.headers.get('upgrade') !== 'websocket') {
    return new Response("Please connect via WebSocket.", { status: 400 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);

  socket.onopen = () => {
    console.log("Client connected");
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      // expected { username, message }
      socket.send(JSON.stringify({
        username: data.username,
        message: data.message
      }));
    } catch (err) {
      console.error(err);
    }
  };

  socket.onclose = () => console.log("Client disconnected");

  return response;
}