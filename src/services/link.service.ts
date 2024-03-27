import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaveLink } from 'src/DTOs/link.dto';
import { Decode, Encode } from 'src/lib/encoder';
import { Link } from 'src/schema/link.schema';

@Injectable()
export class LinkService {
  constructor(@InjectModel(Link.name) private linkModel: Model<Link>) {}

  private async getId() {
    const last = await this.linkModel.findOne().sort({ id: 'desc' });
    const id = last?.id || 0;
    return id + 1;
  }

  async getLink(identity: string) {
    const id = Decode(identity);

    if (!id) {
      throw new BadRequestException('identity is not valid ');
    }

    const link = await this.linkModel.findOne({
      id,
    });

    return link;
  }

  async create(data: SaveLink) {
    const id = await this.getId();
    const hashId = Encode(id);

    const result = new this.linkModel({
      ...data,
      id,
      hashId,
      code: data.code || 302,
    });

    console.log(result);

    return result.save();
  }
}
