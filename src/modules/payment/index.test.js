require('dotenv').config({ path: '.env.test' });
const { formatter } = require('../../util');
const contact = require('../../contact');
const payment = require('./index');

describe('Payment', function() {
  jest.setTimeout(30000);
  let id;

  describe('Affiliate', () => {
    let payload;

    beforeAll(() => {
      payload = formatter.generatePayload('affiliate', 'europe');
    });

    describe('New', () => {
      it('should process payment new affiliate', async () => {
        const response = await payment(payload);
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

  describe('Affiliate Plus', () => {
    let payload;

    beforeAll(() => {
      payload = formatter.generatePayload('affiliate-plus', 'europe');
    });

    describe('New', () => {
      it('should process payment for new affiliate', async () => {
        const response = await payment(payload);
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