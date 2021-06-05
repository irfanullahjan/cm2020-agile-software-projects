import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Property, Image} from '../models';
import {PropertyRepository} from '../repositories';

export class PropertyImageController {
  constructor(
    @repository(PropertyRepository)
    protected propertyRepository: PropertyRepository,
  ) {}

  @get('/properties/{id}/images', {
    responses: {
      '200': {
        description: 'Array of Property has many Image',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Image)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Image>,
  ): Promise<Image[]> {
    return this.propertyRepository.images(id).find(filter);
  }

  @post('/properties/{id}/images', {
    responses: {
      '200': {
        description: 'Property model instance',
        content: {'application/json': {schema: getModelSchemaRef(Image)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Property.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Image, {
            title: 'NewImageInProperty',
            exclude: ['id'],
            optional: ['propertyId'],
          }),
        },
      },
    })
    image: Omit<Image, 'id'>,
  ): Promise<Image> {
    return this.propertyRepository.images(id).create(image);
  }

  @patch('/properties/{id}/images', {
    responses: {
      '200': {
        description: 'Property.Image PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Image, {partial: true}),
        },
      },
    })
    image: Partial<Image>,
    @param.query.object('where', getWhereSchemaFor(Image)) where?: Where<Image>,
  ): Promise<Count> {
    return this.propertyRepository.images(id).patch(image, where);
  }

  @del('/properties/{id}/images', {
    responses: {
      '200': {
        description: 'Property.Image DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Image)) where?: Where<Image>,
  ): Promise<Count> {
    return this.propertyRepository.images(id).delete(where);
  }
}
