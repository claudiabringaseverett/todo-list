import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos =[
      { id: 11, task: 'Wash Dishes' },
      { id: 12, task: 'Sweep Floors' },
      { id: 13, task: 'Clean Bedroom' },
      { id: 14, task: 'Cook Dinner' },
      { id: 15, task: 'Grocery Shopping' }
    ];
    return {todos}
  }
}