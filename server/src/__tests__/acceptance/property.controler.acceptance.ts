import {Client, expect} from '@loopback/testlab';
import {PropertyApplication} from '../..';
import {setupApplication} from './test-helper';

describe('PropertyController', () => {
  let app: PropertyApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('12 test properties created on start up', async () => {
    const res = await client.get('/properties').expect(200);
    expect(res.body).to.have.lengthOf(12);
  });
});
