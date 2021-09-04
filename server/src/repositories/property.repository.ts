import {User, UserRepository} from '@loopback/authentication-jwt';
import {inject, Getter} from '@loopback/core';
import {
  DefaultCrudRepository,
  repository,
  HasOneRepositoryFactory,
  HasManyRepositoryFactory,
  BelongsToAccessor,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Property, PropertyRelations, Address, Image, Report} from '../models';
import {AddressRepository} from './address.repository';
import {ImageRepository} from './image.repository';
import {ReportRepository} from './report.repository';

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

  public readonly reports: HasManyRepositoryFactory<
    Report,
    typeof Property.prototype.id
  >;

  public readonly user: BelongsToAccessor<User, typeof Property.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('AddressRepository')
    protected addressRepositoryGetter: Getter<AddressRepository>,
    @repository.getter('ImageRepository')
    protected imageRepositoryGetter: Getter<ImageRepository>,
    @repository.getter('ReportRepository')
    protected reportRepositoryGetter: Getter<ReportRepository>,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
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
    this.reports = this.createHasManyRepositoryFactoryFor(
      'reports',
      reportRepositoryGetter,
    );
    this.registerInclusionResolver('reports', this.reports.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
