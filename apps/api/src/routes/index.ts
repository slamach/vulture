import { FastifyPluginAsync } from 'fastify';
import { metricsRoutes } from './metrics';

export const routes: FastifyPluginAsync = async (fastify) => {
  fastify.register(metricsRoutes, { prefix: '/metrics' });
};
