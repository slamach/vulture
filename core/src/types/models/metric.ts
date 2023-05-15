export type IMetricProperty = number | string | boolean;

export enum MetricSchemaType {
  NUMBER = 'number',
  STRING = 'string',
  BOOLEAN = 'boolean',
}

export enum ConditionType {
  EQUALS = 'eq',
  NOT_EQUALS = 'ne',
  GREATER = 'gt',
  GREATER_OR_EQUALS = 'gte',
  LESS = 'lt',
  LESS_OR_EQUALS = 'lte',
}

export const ALLOWED_CONDITION_TYPES: Record<
  MetricSchemaType,
  ConditionType[]
> = {
  [MetricSchemaType.NUMBER]: [
    ConditionType.EQUALS,
    ConditionType.NOT_EQUALS,
    ConditionType.GREATER,
    ConditionType.GREATER_OR_EQUALS,
    ConditionType.LESS,
    ConditionType.LESS_OR_EQUALS,
  ],
  [MetricSchemaType.STRING]: [ConditionType.EQUALS, ConditionType.NOT_EQUALS],
  [MetricSchemaType.BOOLEAN]: [ConditionType.EQUALS, ConditionType.NOT_EQUALS],
};

export interface ICondition {
  property: string;
  type: ConditionType;
  value: IMetricProperty;
}

export enum ActionType {
  HTTP_REQUEST = 'httpRequest',
}

export interface IAction {
  type: ActionType;
  payload?: Record<string, any>;
}

export interface IAutomation {
  _id: string;
  name: string;
  description?: string;
  conditions: ICondition[];
  actions: IAction[];
}

export interface IMetric {
  _id: string;
  name: string;
  description?: string;
  schema: Record<string, MetricSchemaType>;
  automations: IAutomation[];
}
