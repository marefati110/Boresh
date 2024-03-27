import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaveLink } from 'src/DTOs/link.dto';
import { Domain } from 'src/schema/domain.schema';
import { Link } from 'src/schema/link.schema';

@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link.name) private linkModel: Model<Link>,
    @InjectModel(Domain.name) private domainModel: Model<Domain>,
  ) {}

  private async getId() {
    const last = await this.linkModel.findOne().sort({ id: 'desc' });
    const id = last?.id || 0;
    return id + 1;
  }

  private async getDomain(hostname: string) {
    const domain = await this.domainModel.findOne({ hostname });

    if (!domain) {
      throw new NotFoundException('domain notfound');
    }

    return domain;
  }

  async getLink(id: string) {
    const link = await this.linkModel.findOne({
      id,
    });

    return link;
  }

  async delete(id: string) {}

  async create(data: SaveLink) {
    const id = await this.getId();
    const domain = await this.getDomain(data.hostname);

    const createdCat = new this.linkModel({
      ...data,
      id,
      domain,
      code: data.code || 302,
    });

    console.log(createdCat);

    return createdCat.save();
  }
}
