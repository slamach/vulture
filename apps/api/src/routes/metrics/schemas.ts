import { FastifySchema } from 'fastify';

const requestMetricProperties = {
  name: { type: 'string' },
  description: { type: 'string' },
  schema: { type: 'object', additionalProperties: { type: 'string' } },
};

const replyMetricProperties = {
  _id: { type: 'string' },
  ...requestMetricProperties,
};

const metricsParams = {
  type: 'object',
  properties: {
    metricId: { type: 'string' },
  },
};

export const getMetricsSchema: FastifySchema = {
  summary: 'Get all metrics',
  tags: ['metrics'],
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: replyMetricProperties,
      },
    },
  },
};

export const createMetricSchema: FastifySchema = {
  summary: 'Create metric',
  tags: ['metrics'],
  params: metricsParams,
  body: {
    type: 'object',
    required: ['name', 'schema'],
    properties: requestMetricProperties,
  },
  response: {
    200: {
      type: 'object',
      properties: replyMetricProperties,
    },
  },
};

export const getSingleMetricSchema: FastifySchema = {
  summary: 'Get single metrics',
  tags: ['metrics'],
  params: metricsParams,
  response: {
    200: {
      type: 'object',
      properties: replyMetricProperties,
    },
  },
};

export const updateMetricSchema: FastifySchema = {
  summary: 'Update metric',
  tags: ['metrics'],
  params: metricsParams,
  body: {
    type: 'object',
    properties: requestMetricProperties,
  },
  response: {
    200: {
      type: 'object',
      properties: replyMetricProperties,
    },
  },
};

export const deleteMetricSchema: FastifySchema = {
  summary: 'Delete metric',
  tags: ['metrics'],
  params: metricsParams,
  response: {
    200: {
      type: 'object',
      properties: replyMetricProperties,
    },
  },
};
