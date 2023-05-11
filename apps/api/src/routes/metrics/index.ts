import { FastifyPluginAsync } from 'fastify';
import {
  getSingleMetric,
  getMetrics,
  createMetric,
  updateMetric,
  deleteMetric,
} from './handlers';
import {
  createMetricSchema,
  deleteMetricSchema,
  getMetricsSchema,
  getSingleMetricSchema,
  updateMetricSchema,
} from './schemas';

export const metricsRoutes: FastifyPluginAsync = async (fastify) => {
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
