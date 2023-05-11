import { IMetric } from '@vulture/core/types/models';
import { FastifySchema } from 'fastify';

export interface IParamsSchema {
  metricId: string;
}

export type ICreateMetricBodySchema = IMetric;

export const getMetricsSchema: FastifySchema = {
  summary: 'Get all metrics',
  tags: ['metrics'],
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          description: { type: 'string' },
          schema: {
            type: 'object',
            additionalProperties: { type: 'string' },
          },
        },
      },
    },
  },
};

export const createMetricSchema: FastifySchema = {
  summary: 'Create metric',
  tags: ['metrics'],
  params: {
    type: 'object',
    properties: {
      metricId: { type: 'string' },
    },
  },
  body: {
    type: 'object',
    required: ['name', 'schema'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      schema: { type: 'object', additionalProperties: { type: 'string' } },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        schema: { type: 'object', additionalProperties: { type: 'string' } },
      },
    },
  },
};

export const getSingleMetricSchema: FastifySchema = {
  summary: 'Get single metrics',
  tags: ['metrics'],
  params: {
    type: 'object',
    properties: {
      metricId: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        schema: { type: 'object', additionalProperties: { type: 'string' } },
      },
    },
  },
};

export const updateMetricSchema: FastifySchema = {
  summary: 'Update metric',
  tags: ['metrics'],
  params: {
    type: 'object',
    properties: {
      metricId: { type: 'string' },
    },
  },
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      schema: { type: 'object', additionalProperties: { type: 'string' } },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        schema: { type: 'object', additionalProperties: { type: 'string' } },
      },
    },
  },
};

export const deleteMetricSchema: FastifySchema = {
  summary: 'Delete metric',
  tags: ['metrics'],
  params: {
    type: 'object',
    properties: {
      metricId: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        _id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        schema: { type: 'object', additionalProperties: { type: 'string' } },
      },
    },
  },
};
