const client = require('./client');
const formatter = require('./formatter');
const constants = require('../constants');

module.exports = {
  client,
  formatter,
  getRelatedTags: (type) => {
    const { relatedTags, types } = constants;
    switch (type) {
      case types.AFFILIATE:
        return relatedTags.AFFILIATE;
      case types.EXHIBITOR:
        return relatedTags.EXHIBITOR;
      case types.AFFILIATEPLUS:
        return relatedTags.AFFILIATEPLUS;
      default:
        return [
          ...relatedTags.AFFILIATE,
          ...relatedTags.EXHIBITOR,
          ...relatedTags.AFFILIATEPLUS,
        ];
    }
  },
  getInterestTag: (type) => {
    const { tags, types } = constants;
    switch (type) {
      case types.AFFILIATE:
        return [tags.AFFILIATE];
      case types.EXHIBITOR:
        return [tags.EXHIBITOR];
      case types.AFFILIATEPLUS:
        return tags.AFFILIATEPLUS;
      default:
        return [
          tags.AFFILIATE,
          tags.EXHIBITOR,
          ...tags.AFFILIATEPLUS,
        ];
    }
  },
  getPaymentTag: (type) => {
    const { payment, types } = constants;
    const { tags } = payment;
    switch (type) {
      case types.AFFILIATE:
        return tags.AFFILIATE;
      case types.AFFILIATEPLUS:
        return [...tags.AFFILIATE, ...tags.PLUS];
      default:
        return [
          ...tags.AFFILIATE,
          ...tags.PLUS,
        ];
    }
  },
  getList: (type) => {
    const { lists, types } = constants;
    switch (type) {
      case types.AFFILIATE:
        return [lists.AFFILIATE];
      case types.EXHIBITOR:
        return [lists.EXHIBITOR];
      default:
        return [lists.AFFILIATE, lists.EXHIBITOR];
    }
  },
  getOnboardingTag: (type, contactType) => {
    const { onboarding } = constants;
    const { tags, types } = onboarding;
    const resultTags = [];

    if (contactType === types.PRIMARY) {
      resultTags.push(...tags.PRIMARY);
    } else {
      resultTags.push(...tags.SECONDARY);
    }

    switch (type) {
      case types.BOOTH:
        resultTags.push(...tags.EXHIBITOR);
        return resultTags;
      case types.SPONSOR:
        resultTags.push(...tags.SPONSOR);
        return resultTags;
      default:
        resultTags.push(...tags.EXHIBITOR, ...tags.SPONSOR);
        return resultTags;
    }
  },
};
