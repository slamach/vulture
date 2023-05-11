import { IMetric } from '@vulture/core/types/models';
import { RouteHandler } from 'fastify';
import mongoose from 'mongoose';
import { ICreateMetricBodySchema, IParamsSchema } from './schemas';

// TODO: Take out metricId validation

export const getMetrics: RouteHandler = async (request) => {
  return await request.server.mongoose.Metric.find();
};

export const createMetric: RouteHandler<{
  Body: ICreateMetricBodySchema;
}> = async (request) => {
  const metric = new request.server.mongoose.Metric(request.body);
  return await metric.save();
};

export const getSingleMetric: RouteHandler<{ Params: IParamsSchema }> = async (
  request,
  reply
) => {
  const { metricId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(metricId)) {
    reply.status(400);
    return { message: 'Invalid id' };
  }

  return await request.server.mongoose.Metric.findById(metricId);
};

export const updateMetric: RouteHandler<{ Params: IParamsSchema }> = async (
  request,
  reply
) => {
  const { metricId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(metricId)) {
    reply.status(400);
    return { message: 'Invalid id' };
  }

  return await request.server.mongoose.Metric.updateOne(
    { _id: metricId },
    request.body as IMetric
  );
};

export const deleteMetric: RouteHandler<{ Params: IParamsSchema }> = async (
  request,
  reply
) => {
  const { metricId } = request.params;
  if (!mongoose.Types.ObjectId.isValid(metricId)) {
    reply.status(400);
    return { message: 'Invalid id' };
  }

  return await request.server.mongoose.Metric.deleteOne({ _id: metricId });
};
