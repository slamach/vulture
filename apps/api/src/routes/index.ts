import { FastifyPluginAsync } from 'fastify';
import { metricsRoutes } from './metrics';
import { dataRoutes } from './data';

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(metricsRoutes, { prefix: '/metrics' });
  fastify.register(dataRoutes, { prefix: '/data' });
};
