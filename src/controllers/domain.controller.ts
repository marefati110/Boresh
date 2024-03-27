import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SaveDomain } from 'src/DTOs/domain.dto';
import { Domain } from 'src/schema/domain.schema';
import { DomainService } from 'src/services/domain.service';

@ApiTags('Domain')
@Controller('domain')
export class DomainController {
  constructor(private domainService: DomainService) {}

  @ApiResponse({ type: Domain })
  @Post()
  async create(@Body() body: SaveDomain) {
    const data = await this.domainService.create(body);
    return data;
  }
}
