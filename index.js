const fastify = require('fastify')();

const PORT = 8000;
const users = {};

fastify.register(require('fastify-cors'), {
  origin: true,
});
fastify.register(require('fastify-socket.io'), {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

fastify.get('/', (req, res) => {
  res.status(200).send('hello world');
});

fastify.listen(PORT, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.info('fastify running on port', PORT);

  fastify.io.on('connection', (socket) => {
    socket.on('vc::auth', ({ username }) => {
      console.log(`new user: ${username}`);
      users[username] = socket.id;
    });
  });
});
