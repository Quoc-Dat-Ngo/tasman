export interface EntityRepository<
  Entity,
  EntityMetadata,
  CreateDTO,
  UpdateDTO,
  QueryDTO = unknown,
  ID = string,
> {
  getAll(query?: QueryDTO): Promise<EntityMetadata>;
  getOne(id: ID): Promise<Entity | null>;
  create(data: CreateDTO): Promise<Entity>;
  update(id: ID, data: UpdateDTO): Promise<Entity | null>;
  delete(id: ID): Promise<Entity | null>;
}
