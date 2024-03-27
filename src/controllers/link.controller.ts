import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SaveLink } from 'src/DTOs/link.dto';
import { LinkService } from 'src/services/link.service';

@ApiTags('Link')
@Controller('link')
export class LinkController {
  constructor(private linkService: LinkService) {}

  @ApiResponse({ type: SaveLink })
  @Post()
  async create(@Body() body: SaveLink) {
    const data = await this.linkService.create(body);
    return data;
  }
}
