import { FastifyPluginAsync } from 'fastify';
import { getData, createData, getDataCsv } from './handlers';
import { getDataSchema, createDataSchema, getDataCsvSchema } from './schemas';

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

  fastify.route({
    method: 'GET',
    url: '/csv',
    handler: getDataCsv,
    schema: getDataCsvSchema,
  });
};
