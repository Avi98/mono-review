import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './session.entitiy';
import { Repository } from 'typeorm';
import { TypeormStore } from 'connect-typeorm';

@Injectable()
export class SessionService {
  private readonly typeormStore: TypeormStore;
  constructor(
    @InjectRepository(Session) private sessionRepo: Repository<Session>,
  ) {
    this.typeormStore = new TypeormStore({
      cleanupLimit: 2,
      ttl: 8640,
    }).connect(sessionRepo);
  }

  getTypeormStore() {
    return this.typeormStore;
  }
}
