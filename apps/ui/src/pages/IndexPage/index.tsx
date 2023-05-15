import { MetricList } from '../../components/MetricList';
import { useGetMetricsQuery } from '../../state/api/metricsAPI';
import styles from './styles.module.css';

export const IndexPage = () => {
  const { data: getMetricsData, isLoading: isGetMetricsLoading } =
    useGetMetricsQuery();

  return (
    <>
      <h1 className="visuallyHidden">Metrics</h1>
      <section>
        <h2 className={styles.title}>Metrics</h2>
        {!isGetMetricsLoading && getMetricsData && (
          <MetricList metrics={getMetricsData} />
        )}
      </section>
    </>
  );
};
