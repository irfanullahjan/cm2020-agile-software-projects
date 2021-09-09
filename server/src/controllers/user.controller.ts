// Adoped from https://github.com/loopbackio/loopback-next/blob/master/examples/todo-jwt/src/controllers/user.controller.ts
// License https://opensource.org/licenses/MIT

import {authenticate, TokenService} from '@loopback/authentication';
import {
  Credentials,
  MyUserService,
  TokenServiceBindings,
  User,
  UserRelations,
  UserRepository,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {model, property, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  post,
  requestBody,
  SchemaObject,
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
import {PropertyRepository} from '../repositories';

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
    @repository(PropertyRepository)
    public propertyRepository: PropertyRepository,
  ) {}

  @post('/user/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: NewUserRequest,
  ): Promise<User> {
    const exisitingUser = await this.userRepository.findOne({
      where: {
        or: [
          {email: newUserRequest.email},
          {username: newUserRequest.username},
        ],
      },
    });

    if (exisitingUser) {
      throw new HttpErrors.Conflict("User with the same email or username already exists.");
    }

    const password = await hash(newUserRequest.password, await genSalt());
    const savedUser = await this.userRepository.create(
      _.omit({...newUserRequest, realm: 'unverified'}, 'password'),
    );
    await this.userRepository.userCredentials(savedUser.id).create({password});
    return savedUser;
  }

  @post('/user/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return {token};
  }

  @authenticate('jwt')
  @get('/user/current', {
    responses: {
      '200': {
        description: 'Return current user details',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async userDetails(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<User> {
    return this.userService.findUserById(currentUserProfile[securityId]);
  }

  @get('/user/all', {
    responses: {
      '200': {
        description: 'Return current user details',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User),
            },
          },
        },
      },
    },
  })
  async userDetailsAll(): Promise<(User & UserRelations)[]> {
    return this.userService.userRepository.find();
  }

  @get('/user/realm/{id}/{realm}', {
    responses: {
      '200': {
        description: 'Set User realm',
      },
    },
  })
  async userSetVerified(
    @param.path.string('id') id: string,
    @param.path.string('realm') realm: string,
  ): Promise<void> {
    if (realm === 'verified' || realm === 'unverified') {
      return this.userService.userRepository.updateById(id, {realm});
    } else {
      throw new HttpErrors.BadRequest('This realm is not allowed.');
    }
  }
}
