import {UserRepository} from '@loopback/authentication-jwt';
import {lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {repository} from '@loopback/repository';
import {genSalt, hash} from 'bcryptjs';
import {PropertyRepository} from '../repositories';
import {properties} from './seed-data';

const users: Array<{
  realm: string;
  username: string;
  email: string;
  password: string;
}> = [
  {
    realm: 'admin',
    username: 'admin1',
    email: 'admin1@example.com',
    password: 'Admin!234',
  },
  {
    realm: 'verified',
    username: 'user1',
    email: 'user1@example.com',
    password: 'useruser',
  },
  {
    realm: 'unverified',
    username: 'user2',
    email: 'user2@example.com',
    password: 'useruser',
  },
];

@lifeCycleObserver()
export class SeedObserver implements LifeCycleObserver {
  constructor(
    @repository(UserRepository) private userRepository: UserRepository,
    @repository(PropertyRepository)
    private propertyRepository: PropertyRepository,
  ) {}
  async start(): Promise<void> {
    users.map(async user => {
      const password = await hash(user.password, await genSalt());
      const userCreated = await this.userRepository.create({
        realm: user.realm,
        username: user.username,
        email: user.email,
      });
      await this.userRepository
        .userCredentials(userCreated.id)
        .create({password});

      for (let i = 0; i < 4; ++i) {
        await this.propertyRepository.create({
          title:
            properties.titles[
              Math.floor(Math.random() * properties.titles.length)
            ],
          price:
            properties.prices[
              Math.floor(Math.random() * properties.prices.length)
            ],
          offer:
            properties.offers[
              Math.floor(Math.random() * properties.offers.length)
            ],
          type: properties.types[
            Math.floor(Math.random() * properties.types.length)
          ],
          area: properties.areas[
            Math.floor(Math.random() * properties.areas.length)
          ],
          userId: userCreated.id,
          dateAvailable: new Date(),
        });
      }
    });
  }
}
