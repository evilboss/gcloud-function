require('dotenv').config({ path: '.env.test' });
const { formatter } = require('../../util');
const reserve = require('./index');
const contact = require('../../contact');
const tag = require('../../tag');

describe('Reserve', function () {
  jest.setTimeout(30000);
  let id;

  describe('Affiliate', () => {
    let payload;

    beforeAll(async () => {
      payload = formatter.generatePayload('affiliate', 'europe');
    });

    describe('New', () => {
      it('should reserve new affiliate', async () => {
        const response = await reserve(payload);
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

    beforeAll(async () => {
      payload = formatter.generatePayload('affiliate-plus', 'europe');
    });

    describe('New', () => {
      it('should reserve new affiliate-plus', async () => {
        const response = await reserve(payload);
        const { subscriber_id } = response;

        expect(response).toBeTruthy();
        expect(response.result_code).toEqual(1);

        id = subscriber_id;
      });

      afterAll(async () => {
        await contact.delete(id);
      });
    });

    describe('Old', () => {
      beforeAll(async () => {
        payload = formatter.generatePayload('affiliate-plus', 'europe');
      });
      
      it('should create contact', async () => {
        const response = await contact.create(payload);
        const { subscriber_id } = response; // eslint-disable-line
        expect(response).toBeTruthy();
        expect(response.result_code).toEqual(1);

        id = subscriber_id;
      });

      it('should add tag', async () => {
        const response = await tag.updateTags(id, ['Interest-Affiliate']);
        expect(response).toBeTruthy();
      });

      it('should reserve existing contact', async () => {
        const response = await reserve(payload);
        const { subscriber_id } = response;
        expect(response).toBeTruthy();
        expect(response.result_code).toEqual(1);
      });

      afterAll(async () => {
        await contact.delete(id);
      })
    });
  });
});