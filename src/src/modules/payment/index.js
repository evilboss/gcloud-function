const contact = require('../../contact');

const payment = async (payload) => {
  const result = await contact.create(payload, 'payment')
    .catch((err) => {
      console.log(err); // eslint-disable-line
    });
  return result;
};

module.exports = payment;
