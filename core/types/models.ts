export interface MetricType {
  name: string;
  description?: string;
  schema: Record<string, 'number' | 'string' | 'boolean'>;
}
