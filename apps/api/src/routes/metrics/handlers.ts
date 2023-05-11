import { MetricType } from '@vulture/core/types/models';
import { RouteHandler } from 'fastify';
import mongoose from 'mongoose';

// TODO: RouteHandler typing

export const getMetrics: RouteHandler = async (request) => {
  return await request.server.mongoose.Metric.find();
};

export const createMetric: RouteHandler = async (request) => {
  const metric = new request.server.mongoose.Metric(request.body);
  return await metric.save();
};

export const getSingleMetric: RouteHandler = async (request, reply) => {
  const { metricId } = request.params as { metricId: string };
  if (!mongoose.Types.ObjectId.isValid(metricId)) {
    reply.status(400);
    return { message: 'Invalid id' };
  }

  return await request.server.mongoose.Metric.findById(metricId);
};

export const updateMetric: RouteHandler = async (request, reply) => {
  const { metricId } = request.params as { metricId: string };
  if (!mongoose.Types.ObjectId.isValid(metricId)) {
    reply.status(400);
    return { message: 'Invalid id' };
  }

  return await request.server.mongoose.Metric.updateOne(
    { _id: metricId },
    request.body as MetricType
  );
};

export const deleteMetric: RouteHandler = async (request, reply) => {
  const { metricId } = request.params as { metricId: string };
  if (!mongoose.Types.ObjectId.isValid(metricId)) {
    reply.status(400);
    return { message: 'Invalid id' };
  }

  return await request.server.mongoose.Metric.deleteOne({ _id: metricId });
};
