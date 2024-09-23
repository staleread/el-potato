import { Chef, ChefAddDto } from '../api/api.types';
import { Storage } from '../dal/storage';

export class ChefService {
  constructor(private readonly storage: Storage<Chef>) {}

  public get(id: number): Chef {
    const chef = this.storage.get(id);

    if (!chef) {
      throw new Error('Chef not found');
    }
    return chef;
  }

  public getAll(): Chef[] {
    return this.storage.getAll();
  }

  public add(dto: ChefAddDto): number {
    // server validation should be here...

    const id = this.storage.getNextId();

    const chef: Chef = {
      id,
      name: dto.name,
      email: dto.email,
    };

    this.storage.add(chef);
    this.storage.saveChanges();

    return id;
  }
}
