require('dotenv').config({ path: '.env.test' });
const { formatter } = require('../../util');
const signup = require('./index');
const contact = require('../../contact');

describe('Sign Up', function () {
  jest.setTimeout(30000);
  let id;

  describe('Affiliate', () => {
    let payload = {};

    beforeAll(() => {
      payload = formatter.generatePayload('affiliate', 'europe');
    });

    describe('New', () => {
      it('should signup contact', async () => {
        const response = await signup(payload);
        const { subscriber_id } = response; // eslint-disable-line
        expect(response).toBeTruthy();
        expect(response.result_code).toEqual(1);

        id = subscriber_id;
      });

      afterAll(async () => {
        await contact.delete(id);
      })
    });
  });

  describe('CES', () => {
    let payload = {};

    beforeAll(() => {
      payload = formatter.generatePayload('exhibitor', 'europe');
    });

    describe('Old', () => {

      it('should create contact', async () => {
        const response = await contact.create(payload);

        expect(response).toBeTruthy();
      });

      it('should signup existing contact', async () => {
        const response = await signup(payload);
        const { subscriber_id } = response; // eslint-disable-line
        expect(response).toBeTruthy();

        id = subscriber_id;
      });


      afterAll(async () => {
        await contact.delete(id);
      })
    });
  });
});
