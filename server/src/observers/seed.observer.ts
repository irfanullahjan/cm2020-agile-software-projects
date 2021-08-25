import {UserRepository} from '@loopback/authentication-jwt';
import {lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {repository} from '@loopback/repository';
import {genSalt, hash} from 'bcryptjs';

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
];

@lifeCycleObserver()
export class SeedObserver implements LifeCycleObserver {
  constructor(
    @repository(UserRepository) private userRepository: UserRepository,
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
    });
  }
}
