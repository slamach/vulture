import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteMetricMutation,
  useGetSingleMetricQuery,
} from '../../state/api/metricsAPI';
import { ReactComponent as TrashIcon } from '../../assets/img/icons/trash.svg';
import { MetricGraph } from '../../components/MetricGraph';
import { ActionButton } from '../../components/ActionButton';
import styles from './styles.module.css';
import { AutomationList } from '../../components/AutomationList';

export const MetricPage = () => {
  const { metricId } = useParams<{ metricId: string }>();
  const [deleteMetric] = useDeleteMetricMutation();
  const { data: getSingleMetricData, isLoading: isGetSingleMetricLoading } =
    useGetSingleMetricQuery(metricId!);
  const navigate = useNavigate();

  const handleDelete = useCallback(async (metricId: string) => {
    try {
      await deleteMetric(metricId);
      alert('Success');
      navigate('/');
    } catch (e) {
      alert(e);
    }
  }, []);

  if (!getSingleMetricData || isGetSingleMetricLoading) {
    return null;
  }

  return (
    <>
      <div className={styles.info}>
        <h1 className={styles.title}>
          <span className="visuallyHidden">Metric</span>
          {getSingleMetricData.name}
        </h1>
        <ul className={styles.controlList}>
          <li>
            <ActionButton
              action={() => handleDelete(metricId!)}
              text="Delete metric"
              icon={TrashIcon}
            />
          </li>
        </ul>
      </div>
      <section className={styles.graphSection}>
        <h2 className="visuallyHidden">Metric graph</h2>
        <MetricGraph />
      </section>
      {Boolean(getSingleMetricData.automations.length) && (
        <section>
          <h2 className={styles.sectionTitle}>Automations</h2>
          <AutomationList
            metricId={metricId!}
            automations={getSingleMetricData.automations}
          />
        </section>
      )}
    </>
  );
};
