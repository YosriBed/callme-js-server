/* eslint-disable no-unused-vars */
const fastify = require('fastify')();

fastify.register(require('fastify-websocket'), {
  errorHandler(error, conn, req, reply) {
    console.error(error);
    conn.destroy(error);
  },
  options: {
    maxPayload: 1048576,
    verifyClient(info, next) {
      // next(false)
      next(true);
    },
  },
});

fastify.get('/', { websocket: true }, (connection, req) => {
  connection.socket.on('connection', () => {
    connection.socket.send('hi ');
  });
  connection.socket.on('close', () => {
    connection.socket.send('bye ');
  });
});

fastify.listen(3000, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
