import {Entity, model, property} from '@loopback/repository';
import { AuditMixin } from './mixins/audit.mixin';

@model()
export class Image extends AuditMixin(Entity) {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  propertyId?: number;

  constructor(data?: Partial<Image>) {
    super(data);
  }
}

export interface ImageRelations {
  // describe navigational properties here
}

export type ImageWithRelations = Image & ImageRelations;
