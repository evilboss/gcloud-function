const contact = require('../../contact');

const onboarding = async (payload) => {
  const result = await contact.create(payload, 'onboarding')
    .catch((err) => {
      console.log(err); // eslint-disable-line
    });
  return result;
};

module.exports = onboarding;
