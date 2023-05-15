import {
  ActionType,
  ConditionType,
  IAutomation,
  MetricSchemaType,
} from '@vulture/core';
import { FastifySchema } from 'fastify';

export interface IAutomationParamsSchema {
  metricId: string;
}

export interface ISpecificAutomationParamsSchema
  extends IAutomationParamsSchema {
  automationId: string;
}

export type ICreateAutomationBodySchema = Omit<IAutomation, '_id'>;
export type IUpdateAutomationBodySchema = Partial<Omit<IAutomation, '_id'>>;

export const automationParamsSchema = {
  type: 'object',
  properties: {
    metricId: { type: 'string' },
    automationId: { type: 'string' },
  },
};

export const updateAutomationBodySchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    conditions: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['property', 'type', 'value'],
        properties: {
          property: { type: 'string' },
          type: { type: 'string', enum: Object.values(ConditionType) },
          value: {
            anyOf: Object.values(MetricSchemaType).map((type) => ({ type })),
          },
        },
      },
    },
    actions: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['type'],
        properties: {
          type: { type: 'string', enum: Object.values(ActionType) },
          payload: { type: 'object' },
        },
      },
    },
  },
};

export const createAutomationBodySchema = {
  required: ['name', 'conditions', 'actions'],
  ...updateAutomationBodySchema,
};

export const automationResponseSchema = {
  ...updateAutomationBodySchema,
  properties: {
    _id: { type: 'string' },
    ...updateAutomationBodySchema.properties,
  },
};

export const getAutomationsSchema: FastifySchema = {
  summary: 'Get all automations of the metric',
  tags: ['metrics'],
  response: {
    200: {
      type: 'array',
      items: automationResponseSchema,
    },
  },
};

export const createAutomationSchema: FastifySchema = {
  summary: 'Create automation of the metric',
  tags: ['metrics'],
  params: automationParamsSchema,
  body: createAutomationBodySchema,
  response: {
    200: automationResponseSchema,
  },
};

export const getSingleAutomationSchema: FastifySchema = {
  summary: 'Get single automation of the metric',
  tags: ['metrics'],
  params: automationParamsSchema,
  response: {
    200: automationResponseSchema,
  },
};

export const updateAutomationSchema: FastifySchema = {
  summary: 'Update automation of the metric',
  tags: ['metrics'],
  params: automationParamsSchema,
  body: updateAutomationBodySchema,
  response: {
    200: automationResponseSchema,
  },
};

export const deleteAutomationSchema: FastifySchema = {
  summary: 'Delete automation of the metric',
  tags: ['metrics'],
  params: automationParamsSchema,
  response: {
    200: automationResponseSchema,
  },
};
