import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { IMetric } from '@vulture/core';
import { ReactComponent as TrashIcon } from '../../assets/img/icons/trash.svg';
import styles from './styles.module.css';
import { useCallback } from 'react';
import { useDeleteMetricMutation } from '../../state/api/metricsAPI';
import { ActionButton } from '../ActionButton';

export interface MetricListProps {
  metrics: IMetric[];
}

export const MetricList = (props: MetricListProps) => {
  const { metrics } = props;
  const [deleteMetric] = useDeleteMetricMutation();

  const handleDelete = useCallback(async (metricId: string) => {
    try {
      await deleteMetric(metricId);
      alert('Success');
    } catch (e) {
      alert(e);
    }
  }, []);

  return (
    <ul className={styles.list}>
      {metrics.map((metric) => (
        <li className={styles.item} key={metric._id}>
          <Link className={styles.titleLink} to={`/${metric._id}`}>
            <h3 className={styles.title}>{metric.name}</h3>
          </Link>
          <ul className={styles.actionList}>
            <li className={styles.actionItem}>
              <ActionButton
                className={styles.actionButton}
                action={() => handleDelete(metric._id)}
                text="Delete"
                icon={TrashIcon}
              />
            </li>
          </ul>
        </li>
      ))}
    </ul>
  );
};
