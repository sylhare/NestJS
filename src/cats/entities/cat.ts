import { CreateCatDto } from "../dtos/create-cat.dto";

export interface Cat {
  name: string;
  age: number;
  breed: string;
}

export class BusinessCat implements Cat {
  name: string;
  age: number;
  breed: string;

  static fromCreatedCat(createdCat: CreateCatDto): Cat {
    const cat = new BusinessCat();
    cat.name = createdCat.name;
    cat.age = createdCat.age;
    cat.breed = createdCat.breed;
    return cat;
  }
}