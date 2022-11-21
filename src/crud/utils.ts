import _ from 'lodash';

export const items2tree = <T extends { id: string; parent?: string; children?: T[] }>(
  items: T[],
): T[] => {
  const schemas = items.map((s) => ({ ...s }));

  const index = _.keyBy(schemas, (s) => s.id);
  const groups = _.groupBy(schemas, (s) => s.parent);

  const results: T[] = [];
  _.keys(groups).forEach((k) => {
    const group = groups[k];
    if (k === undefined || k === 'undefined') {
      group.forEach((s) => results.push(s));
    } else {
      index[k].children = group;
    }
  });

  return results;
};
