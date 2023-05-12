import { FastifySchema } from 'fastify';
import { IMetric, MetricSchemaType } from '@vulture/core';
import {
  automationResponseSchema,
  createAutomationBodySchema,
} from './automations/schemas';

export interface IMetricParamsSchema {
  metricId: string;
}

export type ICreateMetricBodySchema = IMetric;
export type IUpdateMetricBodySchema = Partial<IMetric>;

const metricParamsSchema = {
  type: 'object',
  properties: {
    metricId: { type: 'string' },
  },
};

const updateMetricBodySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    schema: {
      type: 'object',
      additionalProperties: {
        type: 'string',
        enum: Object.values(MetricSchemaType),
      },
    },
    automations: {
      type: 'array',
      items: createAutomationBodySchema,
    },
  },
};

const createMetricBodySchema = {
  required: ['name', 'schema'],
  ...updateMetricBodySchema,
  properties: {
    ...updateMetricBodySchema.properties,
    automations: {
      type: 'array',
      items: createAutomationBodySchema,
    },
  },
};

const metricResponseSchema = {
  ...updateMetricBodySchema,
  properties: {
    _id: { type: 'string' },
    ...updateMetricBodySchema.properties,
    automations: {
      type: 'array',
      items: automationResponseSchema,
    },
  },
};

export const getMetricsSchema: FastifySchema = {
  summary: 'Get all metrics',
  tags: ['metrics'],
  response: {
    200: {
      type: 'array',
      items: metricResponseSchema,
    },
  },
};

export const createMetricSchema: FastifySchema = {
  summary: 'Create metric',
  tags: ['metrics'],
  params: metricParamsSchema,
  body: createMetricBodySchema,
  response: {
    200: metricResponseSchema,
  },
};

export const getSingleMetricSchema: FastifySchema = {
  summary: 'Get single metrics',
  tags: ['metrics'],
  params: metricParamsSchema,
  response: {
    200: metricResponseSchema,
  },
};

export const updateMetricSchema: FastifySchema = {
  summary: 'Update metric',
  tags: ['metrics'],
  params: metricParamsSchema,
  body: updateMetricBodySchema,
  response: {
    200: metricResponseSchema,
  },
};

export const deleteMetricSchema: FastifySchema = {
  summary: 'Delete metric',
  tags: ['metrics'],
  params: metricParamsSchema,
  response: {
    200: metricResponseSchema,
  },
};
