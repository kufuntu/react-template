import { createServer } from "http";
import { createApp } from './app';
import * as Loadable from 'react-loadable';

const PORT = process.env.PORT || 8080;
const server = createServer(createApp());

Loadable.preloadAll().then(() => {
  server.listen(PORT);
});

server.on("listening", () => {
  const addr = server.address();
  if (addr) {
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
  }
});

server.on("error", (err: any) => {
  if (err.syscall !== "listen") throw err;

  const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`;

  switch (err.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw err;
  }
});
