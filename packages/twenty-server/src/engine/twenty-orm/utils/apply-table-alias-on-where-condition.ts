import { isArray, isObject, isString } from '@sniptt/guards';
import {
  type WhereClause,
  type WhereClauseCondition,
} from 'typeorm/query-builder/WhereClause';

type ApplyTableAliasOnWhereConditionParams = {
  condition: WhereClauseCondition;
  tableName: string;
  aliasName: string;
};

export const applyTableAliasOnWhereCondition = ({
  condition,
  tableName,
  aliasName,
}: ApplyTableAliasOnWhereConditionParams): WhereClauseCondition => {
  if (isString(condition)) {
    const conditionParts = condition.split('.');

    if (conditionParts.length === 1) {
      return condition;
    }

    // The same aliased table can be referenced more than once inside a single
    // compound WHERE condition (e.g. a datetime `eq` filter expands into
    // `"alias"."col" >= :p AND "alias"."col" < :p + interval '1 millisecond'`).
    // Rewrite EVERY table-qualifier occurrence of the alias, not just the first
    // dot-segment, so compound conditions remain valid SQL. The lookahead keeps
    // columns whose name embeds the alias string (e.g. `aliasName`) untouched.
    const escapedAlias = aliasName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    return condition.replace(
      new RegExp(`(?<![A-Za-z0-9_])${escapedAlias}(?=["]?\\.)`, 'g'),
      tableName,
    );
  }

  if (isArray(condition)) {
    return condition.map((where: WhereClause) => {
      return {
        ...where,
        condition: applyTableAliasOnWhereCondition({
          condition: where.condition,
          tableName,
          aliasName,
        }),
      };
    });
  }

  if (isObject(condition)) {
    if ('condition' in condition) {
      return {
        ...condition,
        condition: applyTableAliasOnWhereCondition({
          condition: condition.condition,
          tableName,
          aliasName,
        }),
      };
    }

    if ('operator' in condition) {
      return condition;
    }
  }

  return condition;
};
