require('dotenv').config({ path: '.env.test' });
const { formatter } = require('../../util');
const contact = require('../../contact');
const onboarding = require('./index');

describe('Onboarding', function() {
  jest.setTimeout(30000);
  let id;

  describe('Exhibitor', () => {
    let payload;

    beforeAll(() => {
      payload = formatter.generateOnboardingPayload('exhibitor', 'europe', 'primary', 'booth');
    });

    describe('Primary', () => {
      it('should onboard contact as primary contact', async () => {
        const response = await onboarding(payload);
        const { subscriber_id } = response;

        expect(response).toBeTruthy();
        expect(response.result_code).toEqual(1);

        id = subscriber_id;
      });

      it('should onboard contact with sponsor and exhibitor tags', async () => {
        payload = formatter.generateOnboardingPayload('exhibitor', 'europe', 'primary', 'boothsponsor');
        const response = await onboarding(payload);
        const { subscriber_id } = response;

        expect(response).toBeTruthy();
        expect(response.result_code).toEqual(1);

        id = subscriber_id;
      });

      // afterEach(async () => {
      //   await contact.delete(id);
      // });
    });
  });

  describe('Sponsor', () => {
    let payload;

    describe('Secondary', () => {
      beforeAll(() => {
        payload = formatter.generateOnboardingPayload('exhibitor', 'europe', 'secondary', 'sponsor');
      });

      it('should onboard contact as sponsor and secondary contact', async () => {
        const response = await onboarding(payload);
        const { subscriber_id } = response;

        expect(response).toBeTruthy();
        expect(response.result_code).toEqual(1);

        id = subscriber_id; 
      });

      afterAll(async () => {
        await contact.delete(id);
      });
    });
  });
});
