import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SaveLink } from 'src/DTOs/link.dto';
import { Link } from 'src/schema/link.schema';
import { LinkService } from 'src/services/link.service';

@ApiTags('Link')
@Controller('link')
export class LinkController {
  constructor(private linkService: LinkService) {}

  @ApiResponse({ type: Link })
  @Post()
  async create(@Body() body: SaveLink) {
    const data = await this.linkService.create(body);
    return data;
  }
}
