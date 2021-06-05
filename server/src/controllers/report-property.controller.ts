import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Report,
  Property,
} from '../models';
import {ReportRepository} from '../repositories';

export class ReportPropertyController {
  constructor(
    @repository(ReportRepository)
    public reportRepository: ReportRepository,
  ) { }

  @get('/reports/{id}/property', {
    responses: {
      '200': {
        description: 'Property belonging to Report',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Property)},
          },
        },
      },
    },
  })
  async getProperty(
    @param.path.number('id') id: typeof Report.prototype.id,
  ): Promise<Property> {
    return this.reportRepository.property(id);
  }
}
