// const { client, formatter } = require('../../util');
const contact = require('../../contact');

const signup = async (payload) => {
  const result = await contact.create(payload, 'signup')
    .catch((err) => {
      console.log(err); // eslint-disable-line
    });
  return result;
};

module.exports = signup;
