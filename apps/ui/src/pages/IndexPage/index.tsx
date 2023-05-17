import { ActionButton } from '../../components/ActionButton';
import { MetricList } from '../../components/MetricList';
import { useGetMetricsQuery } from '../../state/api/metricsAPI';
import { ReactComponent as PlusIcon } from '../../assets/img/icons/plus.svg';
import styles from './styles.module.css';
import { useState } from 'react';

export const IndexPage = () => {
  const { data: getMetricsData, isLoading: isGetMetricsLoading } =
    useGetMetricsQuery();

  const [isCreationModalOpen, setCreationModalOpen] = useState(false);

  return (
    <>
      <h1 className="visuallyHidden">Home Page</h1>
      <section>
        <div className={styles.info}>
          <h2 className={styles.title}>Metrics</h2>
          <ul className={styles.controlList}>
            <li>
              <ActionButton
                action={() => setCreationModalOpen(true)}
                text="Create metric"
                icon={PlusIcon}
              />
            </li>
          </ul>
        </div>
        {!isGetMetricsLoading && getMetricsData && (
          <MetricList metrics={getMetricsData} />
        )}
      </section>
    </>
  );
};
