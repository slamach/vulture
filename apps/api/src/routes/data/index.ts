import { FastifyPluginAsync } from 'fastify';
import { getData, createData } from './handlers';
import { getDataSchema, createDataSchema } from './schemas';

export const dataRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: 'GET',
    url: '/',
    handler: getData,
    schema: getDataSchema,
  });

  fastify.route({
    method: 'POST',
    url: '/',
    handler: createData,
    schema: createDataSchema,
  });
};
