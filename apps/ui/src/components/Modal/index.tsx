import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { ReactComponent as CrossIcon } from '../../assets/img/icons/cross.svg';
import styles from './styles.module.css';

export interface ModalProps {
  className?: string;
  onClose: () => void;
  title?: string;
  children?: JSX.Element;
}

export const Modal = (props: ModalProps) => {
  const { className, onClose, title, children } = props;

  return ReactDOM.createPortal(
    <div className={styles.container}>
      <div className={styles.overlay} onClick={onClose} />
      <article className={classNames(styles.modal, className)}>
        <button className={styles.closeButton} onClick={onClose}>
          <span className="visuallyHidden">Close</span>
          <CrossIcon width="16" height="16" />
        </button>
        {Boolean(title) && <h2 className={styles.title}>{title}</h2>}
        {children}
      </article>
    </div>,
    document.getElementById('modal')!
  );
};
