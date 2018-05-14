module.exports = {
  endpointUrl: 'admin/api.php',
  contact: {
    ADD: 'contact_add',
    DELETE: 'contact_delete',
    GET: 'contact_view_email',
    UPDATE: 'contact_sync',
    ADD_TAG: 'contact_tag_add',
    DELETE_TAG: 'contact_tag_remove',
  },
  list: {
    GET: 'list_list',
  },
  method: {
    SIGNUP: 'signup',
    RESERVE: 'reserve',
    PAYMENT: 'payment',
    ONBOARDING: 'onboarding',
  },
  relatedTags: {
    EXHIBITOR: [
      'Europe-Company',
      'Europe-ComPlus',
      'Europe-Exhibitor',
      'Europe-Sponsor',
      'Asia-Company',
      'Asia-ComPlus',
      'Asia-Exhibitor',
      'Asia-Sponsor',
      'Interest-Exhibitor-&-Sponsor',
    ],
    AFFILIATE: [
      'Europe-Affiliate',
      'Asia-Affiliate',
    ],
    AFFILIATEPLUS: [
      'Europe-Training',
      'Asia-Training',
    ],
  },
  tags: {
    EXHIBITOR: 'Interest-Exhibitor-&-Sponsor',
    AFFILIATE: 'Interest-Affiliate',
    AFFILIATEPLUS: [
      'Interest-Affiliate',
      'Interest-Training',
    ],
  },
  types: {
    EXHIBITOR: 'exhibitor',
    AFFILIATE: 'affiliate',
    AFFILIATEPLUS: 'affiliate-plus',
    SPONSOR: 'sponsor',
  },
  mode: {
    PAYMENT: 'payment',
    RESERVE: 'reserve',
    SIGNUP: 'signup',
    ONBOARDING: 'onboarding',
  },
  lists: {
    AFFILIATE: 'Attendee',
    EXHIBITOR: 'Company / Exhibitor / Sponsor',
  },
  payment: {
    tags: {
      EXHIBITOR: ['Europe-Company', 'AWE18-Company'],
      AFFILIATE: ['Europe-Affiliate', 'AWE18-Affiliate'],
      PLUS: [
        'Europe-Training',
        'AWE18-Training',
      ],
    },
  },
  onboarding: {
    tags: {
      EXHIBITOR: ['Europe-Exhibitor', 'AWE18-Exhibitor'],
      SPONSOR: ['Europe-Sponsor', 'AWE18-Sponsor'],
      PRIMARY: ['Primary-Contact'],
      SECONDARY: ['Secondary-Contact'],
    },
    types: {
      PRIMARY: 'primary',
      SECONDARY: 'secondary',
      BOOTH: 'booth',
      SPONSOR: 'sponsor',
      BOOTHSPONSOR: 'boothsponsor',
    },
  },
};
