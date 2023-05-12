import { FastifySwaggerOptions, SwaggerOptions } from '@fastify/swagger';
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

export const swaggerConfig: SwaggerOptions = {
  openapi: {
    info: {
      title: 'Vulture API',
      description:
        'Vulture - simple self-hosted analytics and automation tool.',
      version: '0.1.0',
      contact: {
        name: 'Dmitry Sviridov',
        url: 'https://dmitrysviridov.com',
        email: 'sviridov.dvv@gmail.com',
      },
    },
    tags: [
      { name: 'metrics', description: 'Metrics related end-points' },
      { name: 'data', description: 'Metric data records related end-points' },
    ],
  },
};
