import styles from './styles.module.css';

export interface MetricCreationModalProps {
  onClose: () => void;
}

export const MetricCreationModal = (props: MetricCreationModalProps) => {
  const { onClose } = props;

  return (
    <div className={styles.container}>
      <p>Metrics creation modal</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};
