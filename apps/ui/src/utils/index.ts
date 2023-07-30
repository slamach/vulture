import { ConditionType, HttpRequestMethod } from '@vulture/core';

export const CONDITION_TYPE_SIGN: Record<ConditionType, string> = {
  [ConditionType.EQUALS]: '==',
  [ConditionType.NOT_EQUALS]: '!=',
  [ConditionType.GREATER]: '>',
  [ConditionType.GREATER_OR_EQUALS]: '>=',
  [ConditionType.LESS]: '<',
  [ConditionType.LESS_OR_EQUALS]: '<=',
};

export const HTTP_METHODS_WITH_BODY: HttpRequestMethod[] = [
  HttpRequestMethod.POST,
];
