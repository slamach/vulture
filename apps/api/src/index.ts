import Fastify from 'fastify';
import helmet from '@fastify/helmet';
import { routes } from './routes';
import { mongooseConnector } from './plugins/mongoose';
import { config, isDevelopment } from './config';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { swaggerConfig } from './config/swagger';

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
  ignoreTrailingSlash: true,
});

fastify.register(helmet);
fastify.register(fastifySwagger, swaggerConfig);
fastify.register(fastifySwaggerUi, { routePrefix: '/docs' });
fastify.register(mongooseConnector);
fastify.register(routes, { prefix: '/api/v1' });

const start = async () => {
  try {
    await fastify.listen({ port: config.PORT, host: config.HOST });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
