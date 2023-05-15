import classNames from 'classnames';
import styles from './styles.module.css';
import { ReactComponentElement } from 'react';

export interface ActionButtonProps {
  className?: string;
  action: () => void;
  text: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const ActionButton = (props: ActionButtonProps) => {
  const { className, action, text, icon: Icon } = props;

  return (
    <button className={classNames(className, styles.button)} onClick={action}>
      <span className="visuallyHidden">{text}</span>
      <Icon width="13" height="13" />
    </button>
  );
};
