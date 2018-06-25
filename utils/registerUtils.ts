import { Map } from 'immutable';

function isAnImmutableMap(potentialMap) {
  if (!Map.isMap(potentialMap)) throw new Error("expected: Immutable.Map, Instead got ", potentialMap);
  return 1;
}

function mapIdAsKey (pathToId: array, list: array) {
  return list.reduce((cache, item, index) => {
    const id = item.getIn(pathToId);
    try {
      isAnImmutableMap(cache);
    } catch(err) {
      console.error(err);
    }
    return cache.set(id, item);
  }, new Map());
};

const registerUtils = {
  mapIdAsKey,
};

export default registerUtils;
