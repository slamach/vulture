import { IData, MetricSchemaType } from '@vulture/core';
import { FastifySchema } from 'fastify';

export interface IGetDataQuerystringSchema {
  metricId?: string;
}

export type ICreateDataBodySchema = Omit<IData, 'timestamp'>;

const createDataBodySchema = {
  type: 'object',
  required: ['metricId'],
  properties: {
    metricId: { type: 'string' },
    payload: {
      type: 'object',
      additionalProperties: {
        anyOf: Object.values(MetricSchemaType).map((type) => ({ type })),
      },
    },
  },
};

const dataResponseSchema = {
  ...createDataBodySchema,
  properties: {
    _id: { type: 'string' },
    ...createDataBodySchema.properties,
    timestamp: { type: 'string' },
  },
};

export const getDataSchema: FastifySchema = {
  summary: 'Get specified metric records',
  tags: ['data'],
  querystring: {
    type: 'object',
    properties: {
      metricId: { type: 'string' },
    },
  },
  response: {
    200: {
      type: 'array',
      items: dataResponseSchema,
    },
  },
};

export const createDataSchema: FastifySchema = {
  summary: 'Create new metric record',
  tags: ['data'],
  body: createDataBodySchema,
  response: {
    200: dataResponseSchema,
  },
};
