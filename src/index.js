require('dotenv').config();
const mongoose = require('mongoose');
const fastify = require('fastify')({
  logger: process.env.NODE_ENV === 'development' ? true : false
});

const routes = require('./routes');

mongoose.connect(`${process.env.DB_URI}`, { useNewUrlParser: true }, err => {
  if (err) {
    console.error(`Is mongodb running?\n${err}`);
    process.exit(1);
  }
});

Object.values(routes).forEach(routeType => {
  routeType.forEach(route => {
    fastify.route(route);
  });
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
