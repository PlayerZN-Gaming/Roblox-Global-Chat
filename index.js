<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>WebSocket API</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f3f4f6;
      padding: 40px;
      color: #111;
    }
    .box {
      max-width: 600px;
      margin: auto;
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    h1 { margin-top: 0; }
    code {
      background: #eee;
      padding: 4px 6px;
      border-radius: 6px;
    }
  </style>
</head>
<body>
  <div class="box">
    <h1>WebSocket API</h1>
    <p>This project includes a WebSocket API endpoint.</p>

    <p>Connect using WebSocket at:</p>
    <p><code>wss://YOUR-PROJECT.vercel.app/api/ws</code></p>

    <p>To use it, open your WebSocket client and send JSON like:</p>

    <pre>
{
  "username": "Test",
  "message": "Hello"
}
    </pre>

    <p>This homepage is only here to explain the API.</p>
  </div>
</body>
</html>