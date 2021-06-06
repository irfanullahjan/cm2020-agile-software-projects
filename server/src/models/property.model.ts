import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Address} from './address.model';
import {Image} from './image.model';

enum Type {
  LAND = 'land',
  HOUSE = 'house',
  APARTMENT = 'apartment',
  COMMERCIAL = 'commercial'
}

enum Offer {
  SALE = 'sale',
  RENT = 'rent',
}

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
  title: string;

  @property({
    type: 'number',
    required: true,
  })
  area: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(Type)
    }
  })
  type: Type;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(Offer)
    }
  })
  offer: Offer;

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

  @hasMany(() => Image)
  images: Image[];

  constructor(data?: Partial<Property>) {
    super(data);
  }
}

export interface PropertyRelations {
  // describe navigational properties here
}

export type PropertyWithRelations = Property & PropertyRelations;
