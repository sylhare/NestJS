export class SchemaFirst {
  id: number;
  exampleField: string;

  constructor(id?: number, exampleField?: string) {
    this.id = id ?? Math.round(Math.random() * 1000);
    this.exampleField = exampleField ?? 'example';
  }
}
