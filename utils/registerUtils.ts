import { Map } from 'immutable';

function mapIdAsKey (pathToId: array, list: array) {
  return list.reduce((cache, item, index) => {
    const id = item.getIn(pathToId);
    return cache.set(id, list);
  }, new Map());
};

const registerUtils = {
  mapIdAsKey,
};

export default registerUtils;
