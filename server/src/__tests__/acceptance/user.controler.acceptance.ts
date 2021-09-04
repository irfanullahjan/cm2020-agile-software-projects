import {UserRepository} from '@loopback/authentication-jwt';
import {Client, expect} from '@loopback/testlab';
import {PropertyApplication} from '../..';
import {setupApplication} from './test-helper';

describe('UserController', () => {
  let app: PropertyApplication;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('3 test users created on start up', async () => {
    const res = await client.get('/user/all').expect(200);
    expect(res.body).to.be.an.Array().to.have.lengthOf(3);
  });

  it('admin user created', async () => {
    const userRepository = await app.getRepository(UserRepository);
    const admin = await userRepository.findOne({
      where: {email: 'admin1@example.com'},
    });
    expect(admin).to.containEql({email: 'admin1@example.com'});
  });
});
