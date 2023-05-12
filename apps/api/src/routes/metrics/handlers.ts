import { RouteHandler } from 'fastify';
import {
  ICreateMetricBodySchema,
  IMetricParamsSchema,
  IUpdateMetricBodySchema,
} from './schemas';

// TODO: Add error handling

export const getMetrics: RouteHandler = async (request) => {
  const { Metric } = request.server.mongoose;

  return await Metric.find();
};

export const createMetric: RouteHandler<{
  Body: ICreateMetricBodySchema;
}> = async (request) => {
  const { Metric } = request.server.mongoose;

  const metric = new Metric(request.body);

  return await metric.save();
};

export const getSingleMetric: RouteHandler<{
  Params: IMetricParamsSchema;
}> = async (request) => {
  const { Metric } = request.server.mongoose;
  const { metricId } = request.params;

  return await Metric.findById(metricId);
};

export const updateMetric: RouteHandler<{
  Params: IMetricParamsSchema;
  Body: IUpdateMetricBodySchema;
}> = async (request) => {
  const { Metric } = request.server.mongoose;
  const { metricId } = request.params;

  return await Metric.findByIdAndUpdate(metricId, request.body, { new: true });
};

export const deleteMetric: RouteHandler<{
  Params: IMetricParamsSchema;
}> = async (request) => {
  const { Metric } = request.server.mongoose;
  const { metricId } = request.params;

  return await Metric.findByIdAndDelete(metricId);
};
