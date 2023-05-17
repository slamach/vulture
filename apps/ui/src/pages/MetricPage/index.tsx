import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteMetricMutation,
  useGetSingleMetricQuery,
} from '../../state/api/metricsAPI';
import { ReactComponent as TrashIcon } from '../../assets/img/icons/trash.svg';
import { ReactComponent as FileIcon } from '../../assets/img/icons/file.svg';
import { ReactComponent as PlusIcon } from '../../assets/img/icons/plus.svg';
import { MetricGraph } from '../../components/MetricGraph';
import { ActionButton } from '../../components/ActionButton';
import styles from './styles.module.css';
import { AutomationList } from '../../components/AutomationList';
import { useGetMetricDataQuery } from '../../state/api/dataAPI';

export const MetricPage = () => {
  const navigate = useNavigate();

  const { metricId } = useParams<{ metricId: string }>();

  const [deleteMetric] = useDeleteMetricMutation();
  const { data: getSingleMetricData, isLoading: isGetSingleMetricLoading } =
    useGetSingleMetricQuery(metricId!);
  const { data: getMetricDataData, isLoading: isGetMetricDataLoading } =
    useGetMetricDataQuery(metricId!);

  const [isCreationModalOpen, setCreationModalOpen] = useState(false);

  const handleDelete = useCallback(async () => {
    try {
      await deleteMetric(metricId!);
      alert('Success');
      navigate('/');
    } catch (e) {
      alert(e);
    }
  }, []);

  const handleExportToCSV = useCallback(async () => {
    console.log('Metric data exported!');
  }, []);

  if (!getSingleMetricData || isGetSingleMetricLoading) {
    return null;
  }

  return (
    <>
      <div className={styles.info}>
        <div>
          <h1 className={styles.title}>
            <span className="visuallyHidden">Metric</span>
            {getSingleMetricData.name}
          </h1>
          {Boolean(getSingleMetricData.description) && (
            <p className={styles.description}>
              {getSingleMetricData.description}
            </p>
          )}
        </div>
        <ul className={styles.controlList}>
          <li>
            {/* TODO: Take out to config */}
            <ActionButton
              to={`http://localhost:3030/api/v1/data/csv/?metricId=${metricId}`}
              target="_blank"
              text="Export metric data to CSV"
              icon={FileIcon}
            />
          </li>
          <li>
            <ActionButton
              action={handleDelete}
              text="Delete metric"
              icon={TrashIcon}
            />
          </li>
        </ul>
      </div>
      <section className={styles.graphSection}>
        <h2 className="visuallyHidden">Metric graph</h2>
        <MetricGraph data={getMetricDataData} />
      </section>
      {Boolean(getSingleMetricData.automations.length) && (
        <section>
          <div className={styles.info}>
            <h2 className={styles.sectionTitle}>Automations</h2>
            <ul className={styles.controlList}>
              <li>
                <ActionButton
                  action={() => setCreationModalOpen(true)}
                  text="Create automation"
                  icon={PlusIcon}
                />
              </li>
            </ul>
          </div>
          <AutomationList
            metricId={metricId!}
            automations={getSingleMetricData.automations}
          />
        </section>
      )}
    </>
  );
};
