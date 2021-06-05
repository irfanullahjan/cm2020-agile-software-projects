import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Property, PropertyRelations} from '../models';

export class PropertyRepository extends DefaultCrudRepository<
  Property,
  typeof Property.prototype.id,
  PropertyRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Property, dataSource);
  }
}
