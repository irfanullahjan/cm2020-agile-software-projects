import {MixinTarget} from '@loopback/core';
import {property} from '@loopback/repository';

export function AuditMixin<T extends MixinTarget<object>>(baseClass: T) {
  class Mixin extends baseClass {
    @property({
      type: 'number',
      id: true,
      generated: true,
    })
    id?: number;

    @property({
      type: 'date',
      default: () => new Date(),
    })
    createStamp?: Date;

    @property({
      type: 'date',
      default: () => new Date(),
    })
    updateStamp?: Date;
  }
  return Mixin;
}
