import { BaseEntity } from '../entities/entity';

export interface RepositoryInterface<E extends BaseEntity> {
  findById(id: string): Promise<E>;
  findAll(): Promise<E[]>;

  insert(entity: E): Promise<void>;
  update(entity: E): Promise<void>;
  delete(id: string): Promise<void>;
}
