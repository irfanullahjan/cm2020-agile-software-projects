import {
  Entity,
  model,
  property,
  hasOne,
  hasMany,
  belongsTo,
} from '@loopback/repository';
import {AuditMixin} from './mixins/audit.mixin';
import {Address} from './address.model';
import {Image} from './image.model';
import {Report} from './report.model';
import {User} from '@loopback/authentication-jwt';

export enum Type {
  LAND = 'land',
  HOUSE = 'house',
  APARTMENT = 'apartment',
  COMMERCIAL = 'commercial',
}

export enum Offer {
  SALE = 'sale',
  RENT = 'rent',
}

@model()
export class Property extends AuditMixin(Entity) {
  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'number',
    required: true,
  })
  area: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(Type),
    },
  })
  type: Type;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(Offer),
    },
  })
  offer: Offer;

  @property({
    type: 'date',
    default: new Date(),
  })
  dateAvailable?: Date;

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

  @hasOne(() => Address)
  address: Address;

  @hasMany(() => Image)
  images: Image[];

  @hasMany(() => Report)
  reports: Report[];

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Property>) {
    super(data);
  }
}

export interface PropertyRelations {
  // describe navigational properties here
}

export type PropertyWithRelations = Property & PropertyRelations;
