import React, { HTMLProps } from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';

export interface InputProps extends HTMLProps<HTMLInputElement> {
  className?: string;
  label: string;
  hideLabel?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { className, label, hideLabel, ...inputProps } = props;

    return (
      <label className={classNames(styles.container, className)}>
        <span
          className={classNames(styles.label, { visuallyHidden: hideLabel })}
        >
          {label}
        </span>
        <input {...inputProps} ref={ref} className={styles.input} />
      </label>
    );
  }
);
