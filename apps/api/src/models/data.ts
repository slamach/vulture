import mongoose from 'mongoose';
import { IData } from '@vulture/core';

interface IDataWithObjectId extends Omit<IData, 'metricId'> {
  metricId: mongoose.Schema.Types.ObjectId;
}

const dataSchema = new mongoose.Schema<IDataWithObjectId>({
  metricId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Metric',
    required: true,
  },
  timestamp: { type: Date, required: true },
  payload: { type: Map, of: mongoose.Schema.Types.Mixed },
});

export const Data = mongoose.model<IDataWithObjectId>(
  'Data',
  dataSchema,
  'data'
);
