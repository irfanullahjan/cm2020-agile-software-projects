import {Entity, model, property, belongsTo} from '@loopback/repository';
import { AuditMixin } from './mixins/audit.mixin';
import {Property} from './property.model';

@model()
export class Report extends AuditMixin(Entity) {
  @property({
    type: 'string',
    required: true,
  })
  reason: string;

  @property({
    type: 'boolean',
    default: false,
  })
  resolved?: boolean;

  @belongsTo(() => Property)
  propertyId: number;

  @property({
    type: 'string',
    required: true
  })
  userId: string

  constructor(data?: Partial<Report>) {
    super(data);
  }
}

export interface ReportRelations {
  // describe navigational properties here
}

export type ReportWithRelations = Report & ReportRelations;
