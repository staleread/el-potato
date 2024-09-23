import { Storage } from '../dal/storage';
import { ChefService } from '../services/chef.service';
import { Chef, ChefAddDto } from './api.types';

// ideally that should be a bunch of async api calls to server
const chefStorage = new Storage<Chef>('Chefs');
const chefService = new ChefService(chefStorage);

export const getChef = (id: number): Chef => chefService.get(id);

export const getAllChefs = () => chefService.getAll();

export const addChef = (dto: ChefAddDto): number => chefService.add(dto);
