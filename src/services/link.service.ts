import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SaveLink } from 'src/DTOs/link.dto';
import { Link } from 'src/schema/link.schema';

@Injectable()
export class LinkService {
  constructor(@InjectModel(Link.name) private linkModel: Model<Link>) {}

  async create(data: SaveLink) {
    const createdCat = new this.linkModel({
      code: 301,
      id: 1,
      target: '/asdasdasd/',
    });

    console.log(createdCat);

    return createdCat.save();
  }
}
