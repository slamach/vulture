import { RouteHandler } from 'fastify';
import {
  IAutomationParamsSchema,
  ICreateAutomationBodySchema,
  ISpecificAutomationParamsSchema,
  IUpdateAutomationBodySchema,
} from './schemas';

// TODO: Add error handling

export const getAutomations: RouteHandler<{
  Params: IAutomationParamsSchema;
}> = async (request) => {
  const { Metric } = request.server.mongoose;
  const { metricId } = request.params;

  const metric = await Metric.findById(metricId);

  return metric?.automations;
};

export const createAutomation: RouteHandler<{
  Params: IAutomationParamsSchema;
  Body: ICreateAutomationBodySchema;
}> = async (request) => {
  const { Metric } = request.server.mongoose;
  const { metricId } = request.params;

  const metric = await Metric.findById(metricId);
  metric?.automations.push(request.body);
  await metric?.save();

  return metric?.automations.at(-1);
};

export const getSingleAutomation: RouteHandler<{
  Params: ISpecificAutomationParamsSchema;
}> = async (request) => {
  const { Metric } = request.server.mongoose;
  const { metricId, automationId } = request.params;

  const metric = await Metric.findById(metricId);

  return metric?.automations.id(automationId);
};

export const updateAutomation: RouteHandler<{
  Params: ISpecificAutomationParamsSchema;
  Body: IUpdateAutomationBodySchema;
}> = async (request) => {
  const { Metric } = request.server.mongoose;
  const { metricId, automationId } = request.params;

  const metric = await Metric.findById(metricId);
  const automation = metric?.automations.id(automationId);
  automation?.set(request.body);
  await metric?.save();

  return automation;
};

export const deleteAutomation: RouteHandler<{
  Params: ISpecificAutomationParamsSchema;
}> = async (request) => {
  const { Metric } = request.server.mongoose;
  const { metricId, automationId } = request.params;

  const metric = await Metric.findById(metricId);
  const automation = metric?.automations.id(automationId);
  automation?.deleteOne();
  await metric?.save();

  return automation;
};
