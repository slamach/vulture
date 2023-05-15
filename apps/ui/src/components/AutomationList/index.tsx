import { IAutomation } from '@vulture/core';
import { useCallback } from 'react';
import { useDeleteAutomationMutation } from '../../state/api/automationsAPI';
import { List } from '../List';

export interface AutomationListProps {
  metricId: string;
  automations: IAutomation[];
}

export const AutomationList = (props: AutomationListProps) => {
  const { metricId, automations } = props;
  const [deleteAutomation] = useDeleteAutomationMutation();

  const handleDelete = useCallback(async (automationId: string) => {
    try {
      await deleteAutomation({ metricId, automationId });
      alert('Success');
    } catch (e) {
      alert(e);
    }
  }, []);

  return <List items={automations} onDelete={handleDelete} />;
};
