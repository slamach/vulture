import classNames from 'classnames';
import styles from './styles.module.css';
import { ReactComponentElement } from 'react';
import { Link } from 'react-router-dom';

export interface ActionButtonProps {
  className?: string;
  action?: () => void;
  to?: string;
  target?: string;
  text: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const ActionButton = (props: ActionButtonProps) => {
  const { className, action, to, target, text, icon: Icon } = props;

  if (to) {
    return (
      <Link
        className={classNames(className, styles.button)}
        title={text}
        to={to}
        target={target}
      >
        <span className="visuallyHidden">{text}</span>
        <Icon width="13" height="13" />
      </Link>
    );
  }

  return (
    <button
      className={classNames(className, styles.button)}
      title={text}
      onClick={action}
    >
      <span className="visuallyHidden">{text}</span>
      <Icon width="13" height="13" />
    </button>
  );
};
