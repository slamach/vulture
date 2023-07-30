import { ConditionType, IAutomation } from '@vulture/core';
import { useCallback } from 'react';
import { useDeleteAutomationMutation } from '../../state/api/automationsAPI';
import { List } from '../List';
import { CONDITION_TYPE_SIGN } from '../../utils';

export interface AutomationListProps {
  metricId: string;
  automations: IAutomation[];
}

export const AutomationList = (props: AutomationListProps) => {
  const { metricId, automations } = props;
  const [deleteAutomation] = useDeleteAutomationMutation();

  const listItems = automations.map((automation) => ({
    ...automation,
    extra: `${automation.conditions[0].property} ${
      CONDITION_TYPE_SIGN[automation.conditions[0].type]
    } ${automation.conditions[0].value}: ${automation.actions[0].type}`,
  }));

  const handleDelete = useCallback(async (automationId: string) => {
    try {
      await deleteAutomation({ metricId, automationId });
    } catch (e) {
      alert(e);
    }
  }, []);

  return <List items={listItems} onDelete={handleDelete} />;
};
