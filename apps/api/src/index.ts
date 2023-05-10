import Fastify from 'fastify';
import { routes } from './routes';
import { mongodb } from './utils/mongodb';
import { config, isDevelopment } from './config';

const fastify = Fastify({
  logger: isDevelopment
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            ignore: 'pid,hostname',
          },
        },
      }
    : false,
});

fastify.register(mongodb);
fastify.register(routes);

const start = async () => {
  try {
    await fastify.listen({ port: config.PORT, host: config.HOST });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
