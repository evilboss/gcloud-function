
const { formatter, client } = require('../util');
const tag = require('../tag');
const list = require('../list');
const constants = require('../constants');

const contact = {
  get: async (email) => {
    const params = formatter.buildParams(constants.contact.GET, {
      email,
    });

    const result = await client.get(constants.endpointUrl, {
      params,
    });

    return formatter.formatContact(result.data);
  },
  create: async (payload, mode) => {
    const {
      type,
      event,
      onboardingType,
      contactType,
    } = payload;
    const { email } = payload.contact; // eslint-disable-line

    const info = await contact.get(email);
    const lists = await list.createPayload(type);
    const tags = tag.createTags([], event, type, mode, contactType, onboardingType);
    const params = formatter.buildParams(constants.contact.ADD);

    if (info) {
      const updatePayload = Object.assign({}, info, {
        tags: info.tags,
        ...lists,
        // 'field[%ORDERREFERENCE%, 0]': order_reference, // eslint-disable-line
      });
      const updateResult = await contact.update(updatePayload);
      return updateResult;
    }

    const infoPayload = Object.assign({}, payload.contact, {
      tags,
      ...lists,
      // 'field[%ORDERREFERENCE%, 0]': order_reference, // eslint-disable-line
    });

    const createResult = await client.post(constants.endpointUrl, infoPayload, {
      params,
    });

    const { result_code, result_message } = createResult.data; // eslint-disable-line
    if (result_code === 0) throw new Error(result_message); // eslint-disable-line

    return createResult.data;
  },
  update: async (payload) => {
    const params = formatter.buildParams(constants.contact.UPDATE);
    const result = await client.post(constants.endpointUrl, payload, {
      params,
    });
    const { result_code, result_message } = result.data; // eslint-disable-line

    if (result_code === 0) throw new Error(result_message); // eslint-disable-line

    return result.data;
  },
  delete: async (id) => {
    const params = formatter.buildParams(constants.contact.DELETE, {
      id,
    });

    const result = await client.get(constants.endpointUrl, {
      params,
    });

    return result.data;
  },
};

module.exports = contact;
