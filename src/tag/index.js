const _ = require('lodash');
const constants = require('../constants');
const util = require('../util');

const tag = {
  hasExistingEventTags: (tags, event) => {
    const existingTag = tags.find(data => data === event);

    return (existingTag);
  },
  hasExistingTypeTags: (tags, type) => {
    const relatedTags = util.getRelatedTags(type);
    const existingTags = _.without(tags, relatedTags);

    return (existingTags && existingTags.length > 0);
  },
  createTags: (tags, event, type, mode, contactType, onboardingType) => {
    const parsedEvent = _.capitalize(event);
    const createdTags = [parsedEvent];
    const hasTags = (tags.length > 0);

    // Assume new contact hence no tags
    if (hasTags) {
      // Check if tags has existing event-based tag
      if (!tag.hasExistingEventTags(tags, parsedEvent)) {
        // Check if tags has existing type-based tag
        if (!tag.hasExistingTypeTags(tags, type)) {
          const typeTags = tag.createTypeTags(mode, type, contactType, onboardingType);
          return createdTags.push(typeTags);
        }

        return createdTags;
      }
    }

    return tag.createDefaultTags(mode, type, parsedEvent, contactType, onboardingType);
  },
  updateTags: async (id, tags) => {
    const params = util.formatter.buildParams(constants.contact.ADD_TAG);
    const payload = {
      id,
      tags,
    };

    const result = await util.client.post(constants.endpointUrl, payload, {
      params,
    });

    const { result_code, result_message } = result.data; // eslint-disable-line
    if (result_code === 0) throw new Error(result_message); // eslint-disable-line
    return result.data;
  },
  createTypeTags: (mode, type, contactType, onboardingType) => {
    switch (mode) {
      case constants.mode.PAYMENT:
        return util.getPaymentTag(type);
      case constants.mode.ONBOARDING:
        return util.getOnboardingTag(onboardingType, contactType);
      default:
        return util.getInterestTag(type);
    }
  },
  createDefaultTags: (mode, type, parsedEvent, contactType, onboardingType) => {
    const typeTags = tag.createTypeTags(mode, type, contactType, onboardingType);

    return [parsedEvent, ...typeTags];
  },
};

module.exports = tag;
