import mongoose from 'mongoose';
import {
  ActionType,
  ConditionType,
  IAutomation,
  IMetric,
  MetricSchemaType,
} from '@vulture/core';

type IMetricModelType = mongoose.Model<
  IMetric,
  {},
  {
    automations: mongoose.Types.DocumentArray<IAutomation>;
  }
>;

const automationSchema = new mongoose.Schema<IAutomation>({
  name: { type: String, required: true },
  description: String,
  conditions: [
    {
      property: { type: String, required: true },
      type: {
        type: String,
        enum: Object.values(ConditionType),
        required: true,
      },
      value: { type: mongoose.Schema.Types.Mixed, required: true },
    },
  ],
  actions: [
    {
      type: { type: String, enum: Object.values(ActionType), required: true },
      payload: { type: Map, of: mongoose.Schema.Types.Mixed },
    },
  ],
});

const metricSchema = new mongoose.Schema<IMetric, IMetricModelType>({
  name: { type: String, required: true },
  description: String,
  schema: {
    type: Map,
    of: {
      type: String,
      enum: Object.values(MetricSchemaType),
    },
    required: true,
  },
  automations: [automationSchema],
});

export const Metric = mongoose.model<IMetric, IMetricModelType>(
  'Metric',
  metricSchema,
  'metrics'
);
