export interface IMetric {
  name: string;
  description?: string;
  schema: Record<string, 'number' | 'string' | 'boolean'>;
}
