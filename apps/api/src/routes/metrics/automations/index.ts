import { FastifyPluginAsync } from 'fastify';
import {
  getAutomations,
  createAutomation,
  getSingleAutomation,
  updateAutomation,
  deleteAutomation,
} from './handlers';
import {
  getAutomationsSchema,
  createAutomationSchema,
  getSingleAutomationSchema,
  updateAutomationSchema,
  deleteAutomationSchema,
} from './schemas';

export const automationsRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: getAutomations,
    schema: getAutomationsSchema,
  });

  fastify.route({
    method: 'POST',
    url: '/',
    handler: createAutomation,
    schema: createAutomationSchema,
  });

  fastify.route({
    method: 'GET',
    url: '/:automationId',
    handler: getSingleAutomation,
    schema: getSingleAutomationSchema,
  });

  fastify.route({
    method: 'PUT',
    url: '/:automationId',
    handler: updateAutomation,
    schema: updateAutomationSchema,
  });

  fastify.route({
    method: 'DELETE',
    url: '/:automationId',
    handler: deleteAutomation,
    schema: deleteAutomationSchema,
  });
};
