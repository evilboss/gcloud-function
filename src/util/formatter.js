const faker = require('faker');
const _ = require('lodash');

const formatter = {
  buildParams: (endpoint, params) => {
    const result = Object.assign({}, params, {
      api_action: endpoint,
      api_key: process.env.ACTIVE_CAMPAIGN_API_KEY,
      api_output: 'json',
    });
    return result;
  },
  generatePayload: (type, event) => ({
    contact: {
      email: faker.internet.email(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
    },
    type,
    event,
  }),
  generateOnboardingPayload: (type, event, contactType, onboardingType) => ({
    contact: {
      email: faker.internet.email(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      order_reference: '',
    },
    type,
    event,
    contactType,
    onboardingType,
  }),
  formatList: (data) => {
    if (data.result_code === 0) throw new Error(data.result_message); // eslint-disable-line

    const list = _.omit(data, ['result_code', 'result_message', 'result_output']);
    const obj = Object.keys(list).map((index) => {
      const { name } = data[index];

      return { [name]: data[index] };
    });

    return Object.assign({}, ...obj);
  },
  formatContact: (data) => {
    const { result_code, result_message } = data; // eslint-disable-line

    if (result_code === 0) return null; // eslint-disable-line
    return _.omit(data, ['result_code', 'result_message', 'result_output']); // eslint-disable-line
  },
};

module.exports = formatter;

