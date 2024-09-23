type Entity = { id: number };

type StorageData<T extends Entity> = {
  nextId: number;
  items: T[];
};

export class Storage<T extends Entity> {
  private storageKey: string;
  private data: StorageData<T>;

  constructor(storageKey: string) {
    this.storageKey = storageKey;
    this.data = this.loadData();
  }

  private loadData(): StorageData<T> {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : { nextId: 1, items: [] };
  }

  private saveData(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.data));
  }

  public getAll(): T[] {
    return this.data.items;
  }

  public get(id: number): T | undefined {
    return this.data.items.find((item) => item.id === id);
  }

  public add(item: T): void {
    if (
      this.data.items.some((existingItem) => existingItem.id === item.id)
    ) {
      throw new Error('Item with the same ID already exists');
    }
    this.data.items.push(item);
  }

  public getNextId(): number {
    return this.data.nextId++;
  }

  public saveChanges(): void {
    this.saveData();
  }

  public remove(id: number): void {
    const index = this.data.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.data.items.splice(index, 1);
      this.saveChanges();
    }
  }
}
