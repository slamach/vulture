import React, { HTMLProps } from 'react';
import styles from './styles.module.css';
import classNames from 'classnames';

export interface SelectProps extends HTMLProps<HTMLSelectElement> {
  className?: string;
  options: {
    name?: string;
    value: string;
  }[];
  label: string;
  hideLabel?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { className, options, label, hideLabel, ...selectProps } = props;

    return (
      <label className={classNames(styles.container, className)}>
        <span
          className={classNames(styles.label, { visuallyHidden: hideLabel })}
        >
          {label}
        </span>
        <select {...selectProps} ref={ref} className={styles.select}>
          {options.map((option) => (
            <option value={option.value}>{option.name ?? option.value}</option>
          ))}
        </select>
      </label>
    );
  }
);
