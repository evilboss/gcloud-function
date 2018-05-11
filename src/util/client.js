const axios = require('axios');
const qs = require('query-string');

const api = axios.create({
  baseURL: process.env.ACTIVE_CAMPAIGN_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [(data, headers) => { // eslint-disable-line
    const output = qs.stringify(data, {
      encode: false,
      arrayFormat: 'bracket',
    });

    return output;
  }],
});

api.interceptors.request.use(request => request);

api.interceptors.response.use(response => response);
module.exports = api;
