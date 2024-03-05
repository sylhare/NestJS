import { Injectable } from '@nestjs/common';
import { ServiceA } from "../a/a.service";

@Injectable()
export class ServiceB {
  constructor(private serviceA: ServiceA) {}

  doMoreStuff(): string {
    return `more ${this.serviceA.doStuff()}`;
  }
}