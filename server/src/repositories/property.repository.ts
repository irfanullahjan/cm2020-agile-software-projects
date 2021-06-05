import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasOneRepositoryFactory,
  HasManyRepositoryFactory,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Property, PropertyRelations, Address, Image} from '../models';
import {AddressRepository} from './address.repository';
import {ImageRepository} from './image.repository';

export class PropertyRepository extends DefaultCrudRepository<
  Property,
  typeof Property.prototype.id,
  PropertyRelations
> {
  public readonly address: HasOneRepositoryFactory<
    Address,
    typeof Property.prototype.id
  >;

  public readonly images: HasManyRepositoryFactory<
    Image,
    typeof Property.prototype.id
  >;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('AddressRepository')
    protected addressRepositoryGetter: Getter<AddressRepository>,
    @repository.getter('ImageRepository')
    protected imageRepositoryGetter: Getter<ImageRepository>,
  ) {
    super(Property, dataSource);
    this.images = this.createHasManyRepositoryFactoryFor(
      'images',
      imageRepositoryGetter,
    );
    this.registerInclusionResolver('images', this.images.inclusionResolver);
    this.address = this.createHasOneRepositoryFactoryFor(
      'address',
      addressRepositoryGetter,
    );
    this.registerInclusionResolver('address', this.address.inclusionResolver);
  }
}
