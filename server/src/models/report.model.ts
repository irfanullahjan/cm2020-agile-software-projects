import { User } from '@loopback/authentication-jwt';
import {belongsTo, Entity, model, property} from '@loopback/repository';
import {AuditMixin} from './mixins/audit.mixin';

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

  @property({
    type: 'number',
    required: true,
  })
  propertyId: number;

  @belongsTo(() => User)
  userId: string;

  constructor(data?: Partial<Report>) {
    super(data);
  }
}

export interface ReportRelations {
  // describe navigational properties here
}

export type ReportWithRelations = Report & ReportRelations;
