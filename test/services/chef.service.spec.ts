import { Chef, ChefAddDto } from '../../src/api/api.types';
import { Storage } from '../../src/dal/storage';
import { ChefService } from '../../src/services/chef.service';

describe('ChefService', () => {
  let chefService: ChefService;

  const mockStorage = {
    get: (_id: number): Chef | undefined => undefined,
    getAll: (): Chef[] => [],
    add: (_item: Chef) => {},
    saveChanges: () => {},
    getNextId: () => 1,
  };

  beforeEach(() => {
    chefService = new ChefService(mockStorage as Storage<Chef>);
  });

  it('should return chef by ID', () => {
    const chef: Chef = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    };

    jest.spyOn(mockStorage, 'get').mockImplementation((_: number) => chef);

    const result = chefService.get(1);

    expect(result).toEqual(chef);
  });

  it('should throw error if chef not found by ID', () => {
    jest
      .spyOn(mockStorage, 'get')
      .mockImplementation((_: number) => undefined);

    expect(() => chefService.get(1)).toThrowError('Chef not found');
  });

  it('should return all chefs', () => {
    const chefs: Chef[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 1, name: 'Jane Smith', email: 'jane@example.com' },
    ];

    jest.spyOn(mockStorage, 'getAll').mockImplementation(() => chefs);

    const result = chefService.getAll();

    expect(result).toEqual(chefs);
  });

  it('should add a new chef', () => {
    const chefDto: ChefAddDto = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    jest.spyOn(mockStorage, 'getNextId').mockImplementation(() => 1);
    const addSpy = jest
      .spyOn(mockStorage, 'add')
      .mockImplementation(() => {});

    const result = chefService.add(chefDto);

    expect(result).toBe(1);
    expect(addSpy).toHaveBeenCalledWith({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    });
  });

  it('should save changes after adding a new chef', () => {
    const chefDto: ChefAddDto = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    const saveChangesSpy = jest
      .spyOn(mockStorage, 'saveChanges')
      .mockImplementation(() => {});

    chefService.add(chefDto);

    expect(saveChangesSpy).toHaveBeenCalled();
  });
});
