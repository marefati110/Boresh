import { ApiProperty } from '@nestjs/swagger';
import { Link } from 'src/schema/link.schema';

export class SaveLink extends Link {
  @ApiProperty()
  hostname: string;
}
