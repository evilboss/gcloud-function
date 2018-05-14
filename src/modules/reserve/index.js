const contact = require('../../contact');

const reserve = async (payload) => {
  const result = await contact.create(payload, 'reserve')
    .catch((err) => {
      console.log(err); // eslint-disable-line
    });
  return result;
};

module.exports = reserve;
