import { FastifyPluginAsync } from 'fastify';
import {
  getMetrics,
  createMetric,
  getSingleMetric,
  updateMetric,
  deleteMetric,
} from './handlers';
import {
  getMetricsSchema,
  createMetricSchema,
  getSingleMetricSchema,
  updateMetricSchema,
  deleteMetricSchema,
} from './schemas';
import { automationsRoutes } from './automations';

export const metricsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(automationsRoutes, { prefix: '/:metricId/automations' });

  fastify.route({
    method: 'GET',
    url: '/',
    handler: getMetrics,
    schema: getMetricsSchema,
  });

  fastify.route({
    method: 'POST',
    url: '/',
    handler: createMetric,
    schema: createMetricSchema,
  });

  fastify.route({
    method: 'GET',
    url: '/:metricId',
    handler: getSingleMetric,
    schema: getSingleMetricSchema,
  });

  fastify.route({
    method: 'PUT',
    url: '/:metricId',
    handler: updateMetric,
    schema: updateMetricSchema,
  });

  fastify.route({
    method: 'DELETE',
    url: '/:metricId',
    handler: deleteMetric,
    schema: deleteMetricSchema,
  });
};
