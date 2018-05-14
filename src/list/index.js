
const { client, formatter } = require('../util');
const constants = require('../constants');

const list = {
  get: async () => {
    const params = formatter.buildParams(constants.list.GET, {
      ids: 'all',
    });

    const result = await client.get('admin/api.php', {
      params,
    });

    return formatter.formatList(result.data);
  },
  createPayload: async (type) => {
    const { types, lists } = constants;
    const retrievedList = await list.get();

    let filteredList;
    let key;
    let exhibitor;
    let aff;
    let affKey;
    let exKey;

    switch (type) {
      case types.AFFILIATEPLUS:
      case types.AFFILIATE:
        filteredList = retrievedList[lists.AFFILIATE];
        key = `p[${filteredList.id}]`;
        return { [key]: filteredList.id };
      case types.SPONSOR:
      case types.EXHIBITOR:
        filteredList = retrievedList[lists.EXHIBITOR];
        key = `p[${filteredList.id}]`;
        return { [key]: filteredList.id };
      default:
        exhibitor = retrievedList[lists.EXHIBITOR];
        aff = retrievedList[lists.AFFILIATE];
        affKey = `p[${aff.id}]`;
        exKey = `p[${exhibitor.id}]`;
        return {
          [affKey]: aff,
          [exKey]: exhibitor,
        };
    }
  },
};

module.exports = list;
