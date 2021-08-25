import {UserRepository} from '@loopback/authentication-jwt';
import {lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {repository} from '@loopback/repository';
import {genSalt, hash} from 'bcryptjs';

@lifeCycleObserver()
export class SeedObserver implements LifeCycleObserver {
  constructor(
    @repository(UserRepository) private userRepository: UserRepository,
  ) {}
  async start(): Promise<void> {
    const password = await hash('admin!234', await genSalt());
    const admin = await this.userRepository.create({
      username: 'admin',
      email: 'admin@example.com',
      realm: 'admin'
    });
    await this.userRepository.userCredentials(admin.id).create({password});
  }
}
