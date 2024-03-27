import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaveDomain } from 'src/DTOs/domain.dto';
import { Domain } from 'src/schema/domain.schema';

@Injectable()
export class DomainService {
  constructor(@InjectModel(Domain.name) private domainModel: Model<Domain>) {}

  async create(payload: SaveDomain) {
    const model = new this.domainModel({ ...payload });
    const data = await model.save();

    return data;
  }
}
