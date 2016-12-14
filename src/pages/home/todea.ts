export class Todea {
  public name: string;
  public age: number;
  constructor(newName: string, newAge: number) {
    this.name = newName;
    this.age = newAge;
  }
  public getAge(): number {
    return this.age
  }
}