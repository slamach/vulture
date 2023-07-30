import classNames from 'classnames';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import styles from './styles.module.css';
import { Modal } from '../Modal';
import { Input } from '../Input';
import {
  ALLOWED_CONDITION_TYPES,
  ActionType,
  HttpRequestMethod,
  MetricSchemaType,
} from '@vulture/core';
import { ConditionType } from '@vulture/core';
import { IMetricProperty } from '@vulture/core';
import { Select } from '../Select';
import { CONDITION_TYPE_SIGN, HTTP_METHODS_WITH_BODY } from '../../utils';
import { useCreateAutomationMutation } from '../../state/api/automationsAPI';

export interface AutomationCreationModalProps {
  className?: string;
  metricId: string;
  metricSchema: Record<string, IMetricProperty>;
  onClose: () => void;
}

interface FormValue {
  name: string;
  description: string;
  conditionProperty: string;
  conditionType: ConditionType;
  conditionValue: IMetricProperty;
  httpRequestMethod: HttpRequestMethod;
  httpRequestUrl: string;
  httpRequestBody?: string;
}

export const AutomationCreationModal = (
  props: AutomationCreationModalProps
) => {
  const { className, metricId, metricSchema, onClose } = props;

  const [createAutomation] = useCreateAutomationMutation();

  const { register, handleSubmit, watch } = useForm<FormValue>({
    defaultValues: {
      name: '',
      description: '',
      conditionProperty: Object.keys(metricSchema)[0],
      conditionType: ConditionType.EQUALS,
      conditionValue: '',
      httpRequestMethod: HttpRequestMethod.GET,
      httpRequestUrl: '',
      httpRequestBody: '',
    },
  });
  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    const transformedData = {
      name: data.name,
      description: data.description,
      conditions: [
        {
          property: data.conditionProperty,
          type: data.conditionType,
          value: data.conditionValue,
        },
      ],
      actions: [
        {
          type: ActionType.HTTP_REQUEST,
          payload: {
            method: data.httpRequestMethod,
            url: data.httpRequestUrl,
            body: data.httpRequestBody,
          },
        },
      ],
    };

    try {
      await createAutomation({ metricId, automation: transformedData });
      onClose();
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Modal title="Create automation" onClose={onClose}>
      <form
        className={classNames(styles.form, className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input {...register('name', { required: true })} label="Name" />
        <Input {...register('description')} label="Description" />
        <div>
          <p className={styles.sectionTitle}>Condition</p>
          <div className={styles.sectionInputs}>
            <Select
              {...register('conditionProperty')}
              options={Object.keys(metricSchema).map((value) => ({ value }))}
              label="Property"
            />
            <Select
              {...register('conditionType')}
              options={ALLOWED_CONDITION_TYPES[
                metricSchema[watch('conditionProperty')] as MetricSchemaType
              ].map((value) => ({ value, name: CONDITION_TYPE_SIGN[value] }))}
              label="Operator"
            />
            <Input {...register('conditionValue')} label="Value" />
          </div>
        </div>
        <div>
          <p className={styles.sectionTitle}>HTTP Request</p>
          <div className={styles.sectionInputs}>
            <Select
              {...register('httpRequestMethod')}
              options={Object.values(HttpRequestMethod).map((value) => ({
                value,
              }))}
              label="Method"
            />
            <Input {...register('httpRequestUrl')} label="URL" />
            {HTTP_METHODS_WITH_BODY.includes(watch('httpRequestMethod')) && (
              <Input {...register('httpRequestBody')} label="Body (JSON)" />
            )}
          </div>
        </div>
        <button className={styles.submitButton} type="submit">
          Create
        </button>
      </form>
    </Modal>
  );
};
