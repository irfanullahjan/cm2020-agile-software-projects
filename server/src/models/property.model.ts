import {Entity, model, property, hasOne} from '@loopback/repository';
import {Address} from './address.model';

@model()
export class Property extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  area: number;

  @property({
    type: 'object',
    required: true,
  })
  type: object;

  @property({
    type: 'object',
    required: true,
  })
  offer: object;

  @property({
    type: 'date',
    required: true,
  })
  datePosted: string;

  @property({
    type: 'date',
  })
  dateAvailable?: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'boolean',
    default: false,
  })
  installments?: boolean;

  @property({
    type: 'string',
  })
  description?: string;

  @hasOne(() => Address)
  address: Address;

  constructor(data?: Partial<Property>) {
    super(data);
  }
}

export interface PropertyRelations {
  // describe navigational properties here
}

export type PropertyWithRelations = Property & PropertyRelations;
