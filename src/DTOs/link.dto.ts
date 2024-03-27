import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Link } from 'src/schema/link.schema';

export class SaveLink extends OmitType(Link, ['hashId']) {
  @ApiProperty()
  hostname: string;
}
