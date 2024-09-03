import {
  BaseEntity,
  NotFoundError,
  SearchableRepositoryInterface,
  SearchParams,
  SearchResult,
} from '@/common/domain';
import { FindOneOptions, FindOptionsOrder, Repository } from 'typeorm';

export abstract class TypeormBaseRepository<Entity extends BaseEntity>
  implements SearchableRepositoryInterface<Entity>
{
  sortableFields: string[];

  constructor(
    protected readonly repository: Repository<Entity>,
    protected readonly _sortableFields?: string[],
  ) {
    this.sortableFields = _sortableFields;
  }

  async search(props: SearchParams): Promise<SearchResult<Entity>> {
    const sortable = this.sortableFields?.includes(props.sort) || false;
    const orderByField = sortable ? props.sort : 'createdAt';
    const orderByDir = sortable ? props.sortDir : 'DESC';

    const [models, count] = await this.repository.findAndCount({
      order: { [orderByField]: orderByDir } as FindOptionsOrder<Entity>,
      skip: props.page && props.page > 0 ? (props.page - 1) * props.perPage : 0,
      take: props.perPage && props.perPage > 0 ? props.perPage : 15,
    });

    return new SearchResult({
      items: models,
      total: count,
      currentPage: props.page || 1,
      perPage: props.perPage || 15,
      filter: props.filter,
      sort: orderByField,
      sortDir: orderByDir,
    });
  }

  async findById(id: string): Promise<Entity> {
    return await this._get(id);
  }

  async findAll(): Promise<Entity[]> {
    return await this.repository.find();
  }

  async insert(entity: Entity): Promise<void> {
    await this.repository.insert(entity.toJSON());
  }

  async update(entity: Entity): Promise<void> {
    const options: FindOneOptions<Entity> = {
      where: { id: entity.id } as any,
    };

    await this.repository.update(options as any, entity.toJSON());
  }

  async delete(id: string): Promise<void> {
    const options: FindOneOptions<Entity> = {
      where: { id } as any,
    };

    await this.repository.delete(options as any);
  }

  private async _get(id: string): Promise<Entity> {
    try {
      const options: FindOneOptions<Entity> = {
        where: { id } as any,
      };
      const entity = await this.repository.findOne(options);
      return entity;
    } catch {
      throw new NotFoundError(`not found using ID ${id}`);
    }
  }
}
