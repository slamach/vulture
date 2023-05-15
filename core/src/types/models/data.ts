import { IMetricProperty } from './metric';

export interface IData {
  _id: string;
  metricId: string;
  timestamp: Date;
  payload?: Record<string, IMetricProperty>;
}
