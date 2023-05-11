import mongoose from 'mongoose';
import { IMetric } from '@vulture/core/types/models';

const metricSchema = new mongoose.Schema<IMetric>({
  name: { type: String, required: true },
  description: String,
  schema: { type: Object, required: true },
});

export const Metric = mongoose.model<IMetric>(
  'Metric',
  metricSchema,
  'metrics'
);
