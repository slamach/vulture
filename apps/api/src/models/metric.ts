import mongoose from 'mongoose';
import { MetricType } from '@vulture/core/types/models';

const metricSchema = new mongoose.Schema<MetricType>({
  name: { type: String, required: true },
  description: String,
  schema: { type: Object, required: true },
});

export const Metric = mongoose.model<MetricType>(
  'Metric',
  metricSchema,
  'metrics'
);
