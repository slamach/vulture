import classNames from 'classnames';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import styles from './styles.module.css';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { MetricSchemaType } from '@vulture/core';
import { ActionButton } from '../ActionButton';
import { ReactComponent as TrashIcon } from '../../assets/img/icons/trash.svg';
import { ReactComponent as PlusIcon } from '../../assets/img/icons/plus.svg';
import { Select } from '../Select';
import { useCreateMetricMutation } from '../../state/api/metricsAPI';

export interface MetricCreationModalProps {
  className?: string;
  onClose: () => void;
}

interface FormValue {
  name: string;
  description: string;
  schema: {
    name: string;
    type: MetricSchemaType;
  }[];
}

export const MetricCreationModal = (props: MetricCreationModalProps) => {
  const { className, onClose } = props;

  const [createMetric] = useCreateMetricMutation();

  const { control, register, handleSubmit } = useForm<FormValue>({
    defaultValues: {
      name: '',
      description: '',
      schema: [{ name: '', type: MetricSchemaType.NUMBER }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'schema',
    control,
  });
  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    const transformedData = {
      ...data,
      schema: data.schema.reduce<Record<string, MetricSchemaType>>(
        (prev, property) => {
          prev[property.name] = property.type;
          return prev;
        },
        {}
      ),
    };

    try {
      await createMetric(transformedData);
      onClose();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Modal title="Create metric" onClose={onClose}>
      <form
        className={classNames(styles.form, className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input {...register('name', { required: true })} label="Name" />
        <Input {...register('description')} label="Description" />
        <div>
          <div className={styles.sectionInfo}>
            <p className={styles.sectionTitle}>Properties</p>
            <ActionButton
              icon={PlusIcon}
              text="Add property"
              action={() => append({ name: '', type: MetricSchemaType.NUMBER })}
            />
          </div>
          <ul className={styles.propertyList}>
            {fields.map((field, index) => (
              <li key={field.id} className={styles.propertyItem}>
                <Input
                  {...register(`schema.${index}.name`, { required: true })}
                  className={styles.propertyNameInput}
                  placeholder="Property name"
                  label="Property name"
                  hideLabel
                />
                <Select
                  {...register(`schema.${index}.type`)}
                  className={styles.propertyTypeSelect}
                  options={Object.values(MetricSchemaType).map((value) => ({
                    value,
                  }))}
                  label="Property type"
                  hideLabel
                />
                <ActionButton
                  icon={TrashIcon}
                  text="Remove property"
                  action={() => remove(index)}
                />
              </li>
            ))}
          </ul>
        </div>
        <button className={styles.submitButton} type="submit">
          Create
        </button>
      </form>
    </Modal>
  );
};
