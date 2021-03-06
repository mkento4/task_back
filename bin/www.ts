/**
 * Module dependencies.
 */
import app from '../app';
import http from 'http';
import dotenv from 'dotenv';
import debug from 'debug';

dotenv.config();
debug('ts-express:server');

/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val: number | string): number | string | boolean => {
  const port: number = typeof val === 'string' ? parseInt(val, 10) : val;
  // named pipe
  if (isNaN(port)) return val;
  // port number
  else if (port >= 0) return port;
  else return false;
};

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

/**
 * Event listener for HTTP server "error" event.
 */
server.on('error', (error: NodeJS.ErrnoException): void => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

/**
 * Event listener for HTTP server "listening" event.
 */
server.on('listening', (): void => {
  const addr = server.address();
  let bind: string;
  if (typeof addr === 'string') {
    bind = `pipe ${addr}`;
  } else if (addr != null) {
    bind = `port ${addr.port}`;
  } else {
    bind = '';
  }
  debug(`Listening on ${bind}`);
});
