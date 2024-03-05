import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceA {
  doStuff(): string {
    return 'stuff';
  }
}
