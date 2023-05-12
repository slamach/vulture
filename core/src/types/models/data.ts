import { IMetricProperty } from './metric';

export interface IData {
  metricId: string;
  timestamp: Date;
  payload?: Record<string, IMetricProperty>;
}
