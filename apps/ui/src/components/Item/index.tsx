import { Link } from 'react-router-dom';
import { ActionButton } from '../ActionButton';
import { ReactComponent as TrashIcon } from '../../assets/img/icons/trash.svg';
import styles from './styles.module.css';
import classNames from 'classnames';

export interface ItemProps {
  className?: string;
  name: string;
  to?: string;
  extra?: string;
  onDelete: (...args: any) => any;
}

export const Item = (props: ItemProps) => {
  const { className, name, to, extra, onDelete } = props;

  return (
    <li
      className={classNames(className, styles.item, {
        [styles.withLink]: Boolean(to),
      })}
    >
      {to ? (
        <Link className={styles.titleLink} to={to}>
          <h3 className={styles.title}>{name}</h3>
        </Link>
      ) : (
        <h3 className={styles.title}>{name}</h3>
      )}

      <div className={styles.info}>
        {Boolean(extra) && <p className={styles.extra}>{extra}</p>}
        <ul className={styles.actionList}>
          <li className={styles.actionItem}>
            <ActionButton
              className={styles.actionButton}
              action={onDelete}
              text="Delete"
              icon={TrashIcon}
            />
          </li>
        </ul>
      </div>
    </li>
  );
};
