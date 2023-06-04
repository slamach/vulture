import { IMetric } from '@vulture/core';
import { useCallback } from 'react';
import { useDeleteMetricMutation } from '../../state/api/metricsAPI';
import { List } from '../List';

export interface MetricListProps {
  metrics: IMetric[];
}

export const MetricList = (props: MetricListProps) => {
  const { metrics } = props;
  const [deleteMetric] = useDeleteMetricMutation();

  const handleDelete = useCallback(async (metricId: string) => {
    try {
      await deleteMetric(metricId);
    } catch (e) {
      alert(e);
    }
  }, []);

  return (
    <List items={metrics} onDelete={handleDelete} toFormer={(id) => `/${id}`} />
  );
};
