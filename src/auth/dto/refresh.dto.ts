import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshDto {
  @ApiProperty({ example: 'abc123...', description: 'Refresh token' })
  @IsString()
  refresh_token: string;
}
